using Microsoft.Win32;
using Prometheus;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.Security;

namespace Tameenk.Services.QuotationNew.ApiCore.Prometheus
{
    public  class PrometheusHttpRequestModule 
    {
        //private static readonly Counter _globalExceptions = Metrics
        //  .CreateCounter("global_exceptions", "Number of global exceptions.");

        //private static readonly Gauge _httpRequestsInProgress = Metrics
        //    .CreateGauge("http_requests_in_progress", "The number of HTTP requests currently in progress");

        //private static readonly Gauge _httpRequestsTotal = Metrics
        //    .CreateGauge("http_requests_received_total", "Provides the count of HTTP requests that have been processed by this app",
        //        new GaugeConfiguration { LabelNames = new[] { "code", "method", "controller", "action" } });

        //private static readonly Histogram _httpRequestsDuration = Metrics
        //    .CreateHistogram("http_request_duration_seconds", "The duration of HTTP requests processed by this app.",
        //        new HistogramConfiguration { LabelNames = new[] { "code", "method", "controller", "action" } });

        //private const string _timerKey = "PrometheusHttpRequestModule.Timer";

        //private static readonly Counter _globalCaptcha = Metrics.CreateCounter("Captcha_hits", "Number of global Captcha hits.");

        //private static readonly Counter _validateCaptcha = Metrics.CreateCounter("ValidateCaptcha_hits", "Number of global Captcha Validate Hits.");

        public Counter _quoteHits { get; set; }
        public Gauge _noOfActiveUsers { get; set; } 

        //private static readonly Counter _initIquiryCounter = Metrics.CreateCounter("InitIquiry_Counter", "Number of Init Inquiry Hits.");

        //private static readonly Counter _submitInquiryCounter = Metrics.CreateCounter("SubmitInquiry_Counter", "Number of Submit Inquiry hits.");

        //private static readonly Counter _checkoutPaidCounter = Metrics.CreateCounter("CheckoutPaid_Counter", "Number of Paid Quotation.");

        //public static readonly Gauge _companiesInBreakingTotal = Metrics.CreateGauge("_companiesInBreakingTotal", "Provides the count of _companiesInBreakingTotal",
        //    new GaugeConfiguration { LabelNames = new[] { "companyName" } });

        //public static readonly Gauge _noOfActiveUsers = Metrics.CreateGauge("_noOfActiveUsers", "Count the number of active users");

        //public static readonly Gauge _cpuUsage = Metrics.CreateGauge("_cpuUsage", "CPU Utilization Percentage");

        #region CustomCounters

        //public static void IncrementCaptchaCounter() =>
        //    _globalCaptcha.Inc();


        public PrometheusHttpRequestModule()
        {
            _noOfActiveUsers =  Metrics.CreateGauge("_noOfActiveUsers", "Count the number of active users");
            _quoteHits = Metrics.CreateCounter("Quote_Hits", "Number of Hits on Quotation Method.");
        }

        public void IncrementQuotationCounter() =>
            _quoteHits.Inc();

        //public static void IncrementValidateCaptchaCounter() =>
        //    _validateCaptcha.Inc();

        //public static void IncrementInitInquiryCounter() =>
        //    _initIquiryCounter.Inc();

        //public static void IncrementSubmitInquiryCounter() =>
        //    _submitInquiryCounter.Inc();

        //public static void IncrementCheckoutPaidCounter() =>
        //    _checkoutPaidCounter.Inc();

        //public static void SetCompaniesInBreaking(double val, string companyName) =>
        //    _companiesInBreakingTotal.WithLabels(companyName).Set(val);

        public void GetNoOfActiveUsers()
        {
            _noOfActiveUsers.Set(Convert.ToInt32(System.Web.HttpContext.Current.Application["SessionCount"]));
        }

        //public static void GetCpuUsage(double usage)
        //{
        //    _cpuUsage.Set(Convert.ToInt32(usage));
        //}

        #endregion




    }
}
