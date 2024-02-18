using System;
using System.Globalization;
using System.Web.Http;
using Tameenk.Api.Core;
using Tameenk.Leasing.IdentityApi.Output;
using Tameenk.Loggin.DAL;
using Tameenk.Resources.WebResources;

namespace Tameenk.Leasing.IdentityApi.Controllers
{
    /// <summary>
    /// IdentityBaseController
    /// </summary>
    public class IdentityBaseController:BaseApiController
    {
        /// <summary>
        /// Generic output Handler Method
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="output"></param>
        /// <param name="logType"></param>
        /// <param name="code"></param>
        /// <param name="logMessage"></param>
        /// <param name="culture"></param>
        /// <param name="exceptionMessage"></param>
        /// <returns></returns>
        public IHttpActionResult OutputHandler<T>(Output<T> output, dynamic logType, Output<T>.ErrorCodes code, string logMessage, string culture, string exceptionMessage = null)
        {
            output.ErrorCode = code;
            output.ErrorDescription = WebResources.ResourceManager.GetString(logMessage, CultureInfo.GetCultureInfo(culture));

            if (logType.GetType() == typeof(LoginRequestsLog) && code != Output<T>.ErrorCodes.Success)
            {
                if (logType is LoginRequestsLog log)
                {
                    log.ErrorCode = (int)code;
                    log.ErrorDescription = !string.IsNullOrEmpty(exceptionMessage) ? exceptionMessage : WebResources.ResourceManager.GetString(logMessage, CultureInfo.GetCultureInfo("en"));
                    LoginRequestsLogDataAccess.AddLoginRequestsLog(log);
                }
            }

            if (code == Output<T>.ErrorCodes.Success)
                return Single(output);
            else
                return Error(output);
        }
    }
}