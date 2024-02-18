﻿using Autofac;
using System;
using Tameenk.Core.Configuration;
using Tameenk.Core.Domain.Entities;
using Tameenk.Core.Infrastructure;
using Tameenk.Services.Infrastructure;

namespace Tameenk.Services.Tasks
{
    /// <summary>
    /// Task
    /// </summary>
    public partial class Task
    {
        #region Ctor

        /// <summary>
        /// Ctor for Task
        /// </summary>
        private Task()
        {
            this.Enabled = true;
        }

        /// <summary>
        /// Ctor for Task
        /// </summary>
        /// <param name="task">Task </param>
        public Task(ScheduleTask task)
        {
            this.Type = task.Type;
            this.Enabled = task.Enabled;
            this.StopOnError = task.StopOnError;
            this.Name = task.Name;
        }

        #endregion

        #region Utilities

        private ITask CreateTask(ILifetimeScope scope)
        {
            ITask task = null;
            if (this.Enabled)
            {
                var type2 = System.Type.GetType(this.Type);
                if (type2 != null)
                {
                    object instance;
                    if (!EngineContext.Current.ContainerManager.TryResolve(type2, scope, out instance))
                    {
                        //not resolved
                        instance = EngineContext.Current.ContainerManager.ResolveUnregistered(type2, scope);
                    }
                    task = instance as ITask;
                }
            }
            return task;
        }

        #endregion

        #region Methods

        /// <summary>
        /// Executes the task
        /// </summary>
        /// <param name="throwException">A value indicating whether exception should be thrown if some error happens</param>
        /// <param name="dispose">A value indicating whether all instances should be disposed after task run</param>
        /// <param name="ensureRunOnOneWebFarmInstance">A value indicating whether we should ensure this task is run on one farm node at a time</param>
        public void Execute(bool throwException = false, bool dispose = true, bool ensureRunOnOneWebFarmInstance = true)
        {
            //background tasks has an issue with Autofac
            //because scope is generated each time it's requested
            //that's why we get one single scope here
            //this way we can also dispose resources once a task is completed
            var scope = EngineContext.Current.ContainerManager.Scope();
            var scheduleTaskService = EngineContext.Current.ContainerManager.Resolve<IScheduleTaskService>("", scope);
            var scheduleTask = scheduleTaskService.GetTaskByType(this.Type);

            try
            {
                //task is run on one farm node at a time?
                if (ensureRunOnOneWebFarmInstance)
                {
                    //is web farm enabled (multiple instances)?
                    var tameenkConfig = EngineContext.Current.ContainerManager.Resolve<TameenkConfig>("", scope);
                    if (tameenkConfig.MultipleInstancesEnabled)
                    {
                        var machineNameProvider = EngineContext.Current.ContainerManager.Resolve<IMachineNameProvider>("", scope);
                        var machineName = machineNameProvider.GetMachineName();
                        if (String.IsNullOrEmpty(machineName))
                        {
                            throw new Exception("Machine name cannot be detected. You cannot run in web farm.");
                            //actually in this case we can generate some unique string (e.g. Guid) and store it in some "static" (!!!) variable
                            //then it can be used as a machine name
                        }

                        //lease can't be aquired only if for a different machine and it has not expired
                        if (scheduleTask.LeasedUntil.HasValue &&
                            scheduleTask.LeasedUntil.Value >= DateTime.Now &&
                            scheduleTask.LeasedByMachineName != machineName)
                            return;

                        //lease the task. so it's run on one farm node at a time
                        scheduleTask.LeasedByMachineName = machineName;
                        scheduleTask.LeasedUntil = DateTime.Now.AddMinutes(30);
                        scheduleTaskService.UpdateTask(scheduleTask);
                    }
                }

                //initialize and execute
                var task = this.CreateTask(scope);
                if (task != null)
                {
                    this.LastStart = DateTime.Now;
                    if (scheduleTask != null)
                    {
                        //update appropriate datetime properties
                        scheduleTask.LastStart = this.LastStart;
                        scheduleTaskService.UpdateTask(scheduleTask);
                    }
                    task.Execute(scheduleTask.MaxTrials, scheduleTask.SendingThreshold, scheduleTask.CommonPolicyFailureRecipient);
                    this.LastEnd = this.LastSuccess = DateTime.Now;
                }
            }
            catch (Exception)
            {
                this.Enabled = !this.StopOnError;
                this.LastEnd = DateTime.Now;

                //log error
                //var logger = EngineContext.Current.ContainerManager.Resolve<ILogger>("", scope);
                //logger.Error(string.Format("Error while running the '{0}' schedule task. {1}", this.Name, exc.Message), exc);
                if (throwException)
                    throw;
            }

            if (scheduleTask != null)
            {
                //update appropriate datetime properties
                scheduleTask.LastEnd = this.LastEnd;
                scheduleTask.LastSuccess = this.LastSuccess;
                scheduleTaskService.UpdateTask(scheduleTask);
            }

            //dispose all resources
            if (dispose)
            {
                scope.Dispose();
            }
        }

        #endregion

        #region Properties

        /// <summary>
        /// Datetime of the last start
        /// </summary>
        public DateTime? LastStart { get; private set; }

        /// <summary>
        /// Datetime of the last end
        /// </summary>
        public DateTime? LastEnd { get; private set; }

        /// <summary>
        /// Datetime of the last success
        /// </summary>
        public DateTime? LastSuccess { get; private set; }

        /// <summary>
        /// A value indicating type of the task
        /// </summary>
        public string Type { get; private set; }

        /// <summary>
        /// A value indicating whether to stop task on error
        /// </summary>
        public bool StopOnError { get; private set; }

        /// <summary>
        /// Get the task name
        /// </summary>
        public string Name { get; private set; }

        /// <summary>
        /// A value indicating whether the task is enabled
        /// </summary>
        public bool Enabled { get; set; }

        #endregion
    }
}