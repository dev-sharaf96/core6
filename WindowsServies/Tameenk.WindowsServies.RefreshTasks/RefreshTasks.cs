using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.ServiceProcess;
using System.Text;
using System.Threading.Tasks;
using System.Timers;

namespace Tameenk.WindowsServies.RefreshTasks
{
    partial class RefreshTasks : ServiceBase
    {
        Timer timer = new Timer(); // name space(using System.Timers;)  
        public RefreshTasks()
        {
            InitializeComponent();
        }

        protected override void OnStart(string[] args)
        {
            timer.Elapsed += new ElapsedEventHandler(OnElapsedTime);
            timer.Interval = 180000; //number in milisecinds  
            timer.Enabled = true;
            SendRequestToQueue();
            System.IO.File.WriteAllText(@"C:\inetpub\wwwroot\RefreshScheduledTask\logs\WindowsServiceStarted.txt", "Started Successfully");

        }
        private void OnElapsedTime(object source, ElapsedEventArgs e)
        {
            System.IO.File.WriteAllText(@"C:\inetpub\wwwroot\RefreshScheduledTask\logs\WindowsServiceElapsed.txt", "OnElapsedTime");

        }
        protected override void OnStop()
        {
            SendRequestToQueue();
            System.IO.File.WriteAllText(@"C:\inetpub\wwwroot\RefreshScheduledTask\logs\WindowsServiceStop.txt", "Stopped Successfully");

        }
        public static void SendRequestToQueue()
        {
            try
            {
                using (WebClient client = new WebClient())
                {
                    string response1 = client.DownloadString("http://10.201.11.41:8000");
                    string response2 = client.DownloadString("http://10.201.11.173:8000");
                    string response3 = client.DownloadString("http://10.201.11.41:12000");//medical
                    string response4 = client.DownloadString("http://10.201.11.41:5000");//general
                    string response5 = client.DownloadString("http://10.201.11.41:10000");//general
                }
            }
            catch
            {

            }
        }
    }
}
