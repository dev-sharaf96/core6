using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tameenk.Leasing.IdentityApi.Output
{
    public class Output<TResult>
    {
        public enum ErrorCodes
        {
            Success = 1,
            EmptyInputParamter,
            ServiceException,
            NotAuthorized,
            InvalidData,
            NotFound,
            ExceptionError,
            AccountLocked,
            AccountDeleted,
            InValidResponse,
            DeviceInfoIsNull,
            DeviceAlreadyExists,
            DeviceAdded
        }

        public string ErrorDescription { get; set; }
        public ErrorCodes ErrorCode { get; set; }

        /// <summary>
        /// Result
        /// </summary>
        public TResult Result { get; set; }
    }
}