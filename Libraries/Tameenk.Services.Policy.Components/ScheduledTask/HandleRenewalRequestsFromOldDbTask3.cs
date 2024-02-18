﻿using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net.Http;
using System.Text;
using Tameenk.Common.Utilities;
using Tameenk.Core.Configuration;
using Tameenk.Core.Data;
using Tameenk.Core.Domain.Entities;
using Tameenk.Core.Domain.Entities.Quotations;
using Tameenk.Core.Domain.Enums;
using Tameenk.Integration.Dto.Providers;
using Tameenk.Loggin.DAL;
using Tameenk.Resources.WebResources;
using Tameenk.Services.Core.Http;
using Tameenk.Services.Core.Notifications;
using Tameenk.Services.Core.Policies;
using Tameenk.Services.Extensions;
using Tameenk.Services.Logging;

namespace Tameenk.Services.Policy.Components
{
    public class HandleRenewalRequestsFromOldDbTask3 : ITask
    {
        #region Fields
        private readonly IPolicyProcessingService _policyProcessingService;
        #endregion

        #region Ctor
        public HandleRenewalRequestsFromOldDbTask3(IPolicyProcessingService policyProcessingService)
        {
            _policyProcessingService = policyProcessingService;
        }
        #endregion

        #region Methods
        public async void Execute(int maxTrials, int? sendingThreshold, string commonPolicyFailureRecipient)
        {
            _policyProcessingService.HandleCheckoutInsuredMappingTemp();
        }
        #endregion
    }
}