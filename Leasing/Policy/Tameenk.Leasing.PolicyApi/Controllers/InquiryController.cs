using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Web.Http;
using Tameenk.Api.Core;
using Tameenk.Core.Domain.Dtos;
using Tameenk.Core.Domain.Enums.Quotations;
using Tameenk.Services.Inquiry.Components;
using Tameenk.Resources.Quotations;
using Tameenk.Services.Core.Addresses;
using Tameenk.Core.Exceptions;
using Tameenk.Core.Domain.Enums;
using Tameenk.Resources.Inquiry;

namespace Tameenk.Leasing.PolicyApi.Controllers
{
    public class InquiryController : BaseApiController
    {
        private readonly IAddressService _addressService;
        public InquiryController(IAddressService addressService)
        {
            _addressService = addressService ?? throw new TameenkArgumentNullException(nameof(IAddressService));
        }


        /// <summary>
        /// Return list of all medical condition Id Name Pairs
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/inquiry/all-medical-conditions")]
        public IHttpActionResult GetMedicalConditionss()
        {
            try
            {
                LookupsOutput output = new LookupsOutput();
                output.Result = new List<Lookup>();

                var listKeys = Enum.GetValues(typeof(MedicalCondition)).Cast<MedicalCondition>().Select(v => new
                {
                    id = v,
                    key = v.ToString()
                }).ToList();

                foreach (var item in listKeys)
                {
                    output.Result.Add(new Lookup()
                    {
                        Id = ((int)item.id).ToString(),
                        Name = MedicalConditionResource.ResourceManager.GetString(item.key, CultureInfo.GetCultureInfo("ar")),
                        NameEn = MedicalConditionResource.ResourceManager.GetString(item.key, CultureInfo.GetCultureInfo("en")),
                    });
                }

                output.ErrorCode = LookupsOutput.ErrorCodes.Success;
                output.ErrorDescription = "Success";
                return Single(output);
            }
            catch (Exception ex)
            {
                return Error(ex.ToString());
            }
        }

        [HttpGet]
        [Route("api/inquiry/all-educations")]
        public IHttpActionResult GetEducations()
        {
            try
            {
                LookupsOutput output = new LookupsOutput();
                output.Result = new List<Lookup>();

                var listKeys = Enum.GetValues(typeof(Education))
                       .Cast<Education>()
                       .Select(v => new
                       {
                           id = v,
                           key = v.ToString()
                       })
                       .ToList();

                foreach (var item in listKeys)
                {
                    output.Result.Add(new Lookup()
                    {
                        Id = ((int)item.id).ToString(),
                        Name = EducationResource.ResourceManager.GetString(item.key, CultureInfo.GetCultureInfo("ar")),
                        NameEn = EducationResource.ResourceManager.GetString(item.key, CultureInfo.GetCultureInfo("en")),
                    });
                }
                output.ErrorCode = LookupsOutput.ErrorCodes.Success;
                output.ErrorDescription = "Success";
                return Single(output);
            }
            catch (Exception ex)
            {
                return Error(ex.ToString());
            }
        }

        [HttpGet]
        [Route("api/inquiry/getNumberOfAccidentLast5YearsRange")]
        public IHttpActionResult GetNumberOfAccidentLast5YearsRange()
        {
            try
            {
                    LookupsOutput output = new LookupsOutput();
                    output.Result = new List<Lookup>();

                    var item = new Lookup()
                    {
                        Id = "0",
                        Name = GeneralMessages.ResourceManager.GetString("None", CultureInfo.GetCultureInfo("ar")),
                        NameEn = GeneralMessages.ResourceManager.GetString("None", CultureInfo.GetCultureInfo("en")),
                    };

                    output.Result.Add(item);

                    for (int i = 1; i < 11; i++)
                    {
                        output.Result.Add(new Lookup()
                        {
                            Id = i.ToString(),
                            Name = i.ToString(),
                            NameEn = i.ToString(),
                        });
                    }
                    output.ErrorCode = LookupsOutput.ErrorCodes.Success;
                    output.ErrorDescription = "Success";
                    return Single(output);
            }
            catch (Exception ex)
            {
                return Error(ex.ToString());
            }

        }

        [HttpGet]
        [Route("api/inquiry/all-relationsShip")]
        public IHttpActionResult GetRelationsShip()
        {
            try
            {
                LookupsOutput output = new LookupsOutput();
                output.Result = new List<Lookup>();
                var listKeys = Enum.GetValues(typeof(RelationShip))
                        .Cast<RelationShip>()
                        .Select(v => new
                        {
                            id = v,
                            key = v.ToString()
                        })
                        .ToList();
                foreach (var item in listKeys)
                {
                    output.Result.Add(new Lookup()
                    {
                        Id = ((int)item.id).ToString(),
                        Name = RelationShipResource.ResourceManager.GetString(item.key, CultureInfo.GetCultureInfo("ar")),
                        NameEn = RelationShipResource.ResourceManager.GetString(item.key, CultureInfo.GetCultureInfo("en")),
                    });
                }
                output.ErrorCode = LookupsOutput.ErrorCodes.Success;
                output.ErrorDescription = "Success";
                return Single(output);
            }
            catch (Exception ex)
            {
                return Error(ex.ToString());
            }

        }

        [HttpGet]
        [Route("api/inquiry/violations")]
        public IHttpActionResult GetViolations()
        {
            try
            {
                LookupsOutput output = new LookupsOutput();
                output.Result = new List<Lookup>();
                var listKeys = Enum.GetValues(typeof(Violation))
                       .Cast<Violation>()
                       .Select(v => new
                       {
                           id = v,
                           key = v.ToString()
                       })
                       .ToList();
                foreach (var item in listKeys)
                {
                    output.Result.Add(new Lookup()
                    {
                        Id = ((int)item.id).ToString(),
                        Name = ViolationResource.ResourceManager.GetString(item.key, CultureInfo.GetCultureInfo("ar")),
                        NameEn = ViolationResource.ResourceManager.GetString(item.key, CultureInfo.GetCultureInfo("en")),
                    });
                }
                output.ErrorCode = LookupsOutput.ErrorCodes.Success;
                output.ErrorDescription = "Success";
                return Single(output);
            }
            catch (Exception ex)
            {
                return Error(ex.Message);
            }

        }

        [HttpGet]
        [Route("api/inquiry/all-countries")]
        public IHttpActionResult GetCountries()
        {
            try
            {
                LookupsOutput output = new LookupsOutput();
                output.Result = new List<Lookup>();
                var listKeys = _addressService.GetCountries(0, int.MaxValue).Where(a => a.Code != 113).ToList();

                foreach (var item in listKeys)
                {
                    output.Result.Add(new Lookup()
                    {
                        Id = item.Code.ToString(),
                        Name = item.ArabicDescription,
                        NameEn = item.EnglishDescription,
                    });
                }

                output.ErrorCode = LookupsOutput.ErrorCodes.Success;
                output.ErrorDescription = "Success";
                return Single(output);
            }
            catch (Exception ex)
            {
                return Error(ex.Message);
            }
        }

        [HttpGet]
        [Route("api/inquiry/all-cities")]
        public IHttpActionResult GetCities()
        {
            try
            {
                LookupsOutput output = new LookupsOutput();
                output.Result = new List<Lookup>();
                var listKeys = _addressService.GetAllFromCities().ToList();

                foreach (var item in listKeys)
                {
                    output.Result.Add(new Lookup()
                    {
                        Id = item.Code.ToString(),
                        Name = item.ArabicDescription,
                        NameEn = item.EnglishDescription,
                    });
                }

                output.ErrorCode = LookupsOutput.ErrorCodes.Success;
                output.ErrorDescription = "Success";
                return Single(output);
            }
            catch (Exception ex)
            {
                return Error(ex.Message);
            }
        }

        [HttpGet]
        [Route("api/inquiry/getLicenseYearsList")]
        public IHttpActionResult GetLicenseYearsList()
        {
            try
            {
                LookupsOutput output = new LookupsOutput();
                output.Result = new List<Lookup>();

                List<IdNamePair> licenseYears = new List<IdNamePair>();
                var item = new IdNamePair();

                for (int i = 1; i < 21; i++)
                {
                    output.Result.Add(new Lookup()
                    {
                        Id = ((int)i).ToString(),
                        Name = i.ToString(),
                        NameEn = i.ToString(),
                    });
                }

                output.ErrorCode = LookupsOutput.ErrorCodes.Success;
                output.ErrorDescription = "Success";
                return Single(output);
            }
            catch (Exception ex)
            {
                return Error(ex.ToString());
            }
        }
    }
}