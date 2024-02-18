using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Http;
using System.Web.Mvc;
using Tameenk.Core.Domain.Dtos;
using Tameenk.Payment.Esal.Component;
using System.Web.Http;
using Tameenk.Api.Core;
using Tameenk.Services.Administration.Identity;

namespace Tameenk.Services.AdministrationApi.Controllers
{

    [AdminAuthorizeAttribute(pageNumber: 0)]
    public class EsalController : AdminBaseApiController
    {
        private readonly IEsalSearchService _esalSearchService;
        public EsalController(IEsalSearchService esalSearchService)
        {
            _esalSearchService = esalSearchService;
        }

        [System.Web.Http.Route("api/Esal/all-filter")]
        [System.Web.Http.HttpGet]
        public IHttpActionResult SearchEsalInvoices(string InvoiceNumber = null, string SadadBillsNumber = null, string ReferenceId = null, bool? isPaid = null, int itemsPerPage = int.MaxValue, int pageNumber = 1)
        {
            try
            {
                return Ok(_esalSearchService.SearchInvoices(new EsalInvoicesFilter
                {
                    InvoiceNumber = string.IsNullOrEmpty(InvoiceNumber?.Trim()) ? null : InvoiceNumber.Trim(),
                    ReferenceId = string.IsNullOrEmpty(ReferenceId?.Trim()) ? null : ReferenceId.Trim(),
                    SadadBillsNumber = string.IsNullOrEmpty(SadadBillsNumber?.Trim()) ? null : SadadBillsNumber.Trim(),
                    IsPaid = isPaid
                }, itemsPerPage, pageNumber).Result);
            }
            catch (Exception ex)
            {
                return Error("an error has occured");
            }

        }
    }
}