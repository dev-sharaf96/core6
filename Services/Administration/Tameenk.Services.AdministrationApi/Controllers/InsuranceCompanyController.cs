using Swashbuckle.Swagger.Annotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Tameenk.Api.Core;
using Tameenk.Api.Core.Models;
using Tameenk.Core.Domain.Entities;
using Tameenk.Services.Core.InsuranceCompanies;
using Tameenk.Services.AdministrationApi.Extensions;
using Tameenk.Services.AdministrationApi.Models;
using Tameenk.Core.Domain.Enums;
using Tameenk.Core.Exceptions;
using Tameenk.Api.Core.Context;
using System.Net.Http.Headers;
using Tameenk.Core.Configuration;
using Tameenk.Services.Core.Files;
using Newtonsoft.Json;
using Tameenk.Services.Core.Http;
using System.Threading.Tasks;
using Tameenk.Common.Utilities;
using Tameenk.Loggin.DAL;
using Microsoft.AspNet.Identity;
using Tameenk.Services.Administration.Identity.Core.Servicies;
using System.IO;
using Tameenk.Services.Administration.Identity;
using Tameenk.Core.Data;

namespace Tameenk.Services.AdministrationApi.Controllers
{
    /// <summary>
    /// Update / Add / ( Active - inActive ) insurance company .
    /// </summary>
    public class InsuranceCompanyController : AdminBaseApiController
    {
        #region Fields
        private readonly IInsuranceCompanyService _insuranceCompanyService;
        private IWebApiContext _webApiContext;
        private readonly IFileService _FileService;
        private readonly TameenkConfig _tameenkConfig;
        private readonly IHttpClient _client;
        private readonly IUserPageService _userPageService;
        private readonly IRepository<Contact> _contact;
        private readonly IRepository<Address> _address;
        private readonly IRepository<InsuranceCompany> _CO;
        #endregion


        #region Ctor
        /// <summary>
        /// The constructor.
        /// </summary>
        /// <param name="insuranceCompanyService">The insurance Company Service.</param>
        /// <param name="webApiContext">Web api Context</param>
        /// <param name="tameenkConfig">Tameenk Config</param>
        /// <param name="FileService">File service</param>
        /// <param name="client">I Http Client</param>
        /// <param name="userPageService">User Page Service</param>
        public InsuranceCompanyController(IInsuranceCompanyService insuranceCompanyService
            , IWebApiContext webApiContext
            , TameenkConfig tameenkConfig , IFileService FileService
            , IHttpClient client
            , IUserPageService userPageService
            , IRepository<Contact> contact
            , IRepository<Address> address
            , IRepository<InsuranceCompany> CO)
        {
            _insuranceCompanyService = insuranceCompanyService ?? throw new TameenkArgumentNullException(nameof(IInsuranceCompanyService));
            _webApiContext = webApiContext ?? throw new TameenkArgumentNullException(nameof(IWebApiContext));
            _tameenkConfig = tameenkConfig ?? throw new TameenkArgumentNullException(nameof(TameenkConfig));
            _FileService= FileService ?? throw new TameenkArgumentNullException(nameof(IFileService));
            _client = client ?? throw new TameenkArgumentNullException(nameof(IHttpClient));
            _userPageService = userPageService ?? throw new TameenkArgumentNullException(nameof(IUserPageService));
            _contact = contact;
            _address = address;
            _CO = CO;
        }

        #endregion

        #region methods


        /// <summary>
        /// get all insuarance companies by name only return (id, name)
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("api/insurance-company/companies-name")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(CommonResponseModel<IEnumerable<IdNamePairModel>>))]
        public IHttpActionResult GetAllInsuranceCompaniesName()
        {
            try
            {
                var language = _webApiContext.CurrentLanguage;
                var result = _insuranceCompanyService.GetAll();

                IEnumerable<IdNamePairModel> dataModel = result.Select(e => new IdNamePairModel()
                {
                    Id = e.InsuranceCompanyID,
                    Name = (language == LanguageTwoLetterIsoCode.En) ? e.NameEN: e.NameAR
                });

                return Ok(dataModel, result.Count());
            }
            catch (Exception ex)
            {
                return Error("an error has occured");
            }

        }


        /// <summary>
        /// get all insuarance companies
        /// </summary>
        /// <param name="pageIndex">page Index</param>
        /// <param name="pageSize">page Size</param>
        /// <param name="sortField">Sort Field</param>
        /// <param name="sortOrder">sort Order</param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/insurance-company/all")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(CommonResponseModel<IList<InsuranceCompanyModel>>))]
        public IHttpActionResult GetAllInsuranceCompanies(int pageIndex = 0, int pageSize = int.MaxValue, string sortField = "InsuranceCompanyID", bool sortOrder = true,bool showInActive=false)
        {
            try
            {
                var result = _insuranceCompanyService.GetAllInsuranceCompanies(pageIndex, pageSize, sortField, sortOrder,showInActive);
                IEnumerable<InsuranceCompanyModel> dataModel = null;
                //then convert to model
                dataModel = result.OrderBy(a=>a.Order).Select(e => e.ToModel());
                return Ok(dataModel, result.TotalCount);
            }
            catch (Exception ex)
            {
                return Error("an error has occured");
            }

        }
        /// <summary>
        /// change state of company ( Active / deactive )
        /// </summary>
        /// <param name="isActive">is Active</param>
        /// <param name="insuranceCompanyId">insurance company id</param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/insurance-company/change-state")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(CommonResponseModel<InsuranceCompanyModel>))]
        [AdminAuthorizeAttribute(pageNumber: 17)]
        public IHttpActionResult ToggleCompanyActivation(bool isActive, int insuranceCompanyId)
        {
            DateTime dtBeforeCalling = DateTime.Now;
            AdminRequestLog log = new AdminRequestLog();
            log.UserIP = Utilities.GetUserIPAddress();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.CompanyID = insuranceCompanyId;
            log.PageName = "Insurance Companies";
            log.PageURL = "Insurance Companies";
            log.ApiURL = Utilities.GetCurrentURL;
            log.MethodName = "ToggleCompanyActivation";
            log.ServiceRequest = $"isActive: {isActive}, insuranceCompanyId: {insuranceCompanyId}";
            log.UserID = User.Identity.GetUserId();
            log.UserName = User.Identity.GetUserName();
            log.RequesterUrl = Utilities.GetUrlReferrer();
            try
            {

                if (Utilities.IsBlockedUser(log.UserName, log.UserID, log.UserAgent))
                {
                    log.ErrorCode = 3;
                    log.ErrorDescription = "User not authorized";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authorized");
                }
                if (!User.Identity.IsAuthenticated)
                {
                    log.ErrorCode = 2;
                    log.ErrorDescription = "User not authenticated";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authenticated");
                }
                var isAuthorized = _userPageService.IsAuthorizedUser(17, log.UserID);
                if (!isAuthorized)
                {
                    log.ErrorCode = 10;
                    log.ErrorDescription = "User not authenticated : " + log.UserID;
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("Not Authorized : " + log.UserID);
                }
                if (insuranceCompanyId <= 0)
                {
                    log.ErrorCode = 4;
                    log.ErrorDescription = "Invalid request";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("Invalid Request");
                }
                var insuranceCompany = _insuranceCompanyService.GetById(insuranceCompanyId);
                log.CompanyName = insuranceCompany.Key;
               
                InsuranceCompany result = _insuranceCompanyService.ToggleCompanyActivation(isActive: isActive, insuranceCompanyId: insuranceCompanyId);
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(dtBeforeCalling).TotalSeconds;
                log.ErrorCode = 1;
                log.ErrorDescription ="Success";
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Ok(result.ToModel());
            }
            catch (Exception ex)
            {
                log.ErrorCode = 400;
                log.ErrorDescription = ex.ToString();
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Error("an error has occured");
            }
        }

        /// <summary>
        /// change state of company ( Active / deactive )
        /// </summary>
        /// <param name="isActive">is Active</param>
        /// <param name="insuranceCompanyId">insurance company id</param>
        /// <param name="insuranceType">insurance type</param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/insurance-company/change-state-byType")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(CommonResponseModel<InsuranceCompanyModel>))]
        [AdminAuthorizeAttribute(pageNumber: 17)]
        public IHttpActionResult ToggleCompanyActivationByType(bool isActive, int insuranceCompanyId, int insuranceType)
        {
            DateTime dtBeforeCalling = DateTime.Now;
            AdminRequestLog log = new AdminRequestLog();
            log.UserIP = Utilities.GetUserIPAddress();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.CompanyID = insuranceCompanyId;
            log.PageName = "Insurance Companies";
            log.PageURL = "Insurance Companies";
            log.ApiURL = Utilities.GetCurrentURL;
            log.MethodName = "ToggleCompanyActivationByType";
            log.ServiceRequest = $"isActive: {isActive}, insuranceCompanyId: {insuranceCompanyId}";
            log.UserID = User.Identity.GetUserId();
            log.UserName = User.Identity.GetUserName();
            log.RequesterUrl = Utilities.GetUrlReferrer();
            try
            {
                if (Utilities.IsBlockedUser(log.UserName, log.UserID, log.UserAgent))
                {
                    log.ErrorCode = 3;
                    log.ErrorDescription = "User not authorized";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authorized");
                }
                if (!User.Identity.IsAuthenticated)
                {
                    log.ErrorCode = 2;
                    log.ErrorDescription = "User not authenticated";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authenticated");
                }
                var isAuthorized = _userPageService.IsAuthorizedUser(17, log.UserID);
                if (!isAuthorized)
                {
                    log.ErrorCode = 10;
                    log.ErrorDescription = "User not authenticated : " + log.UserID;
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("Not Authorized : " + log.UserID);
                }
                if (insuranceCompanyId<=0)
                {
                    log.ErrorCode =4;
                    log.ErrorDescription = "Invalid request";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("Invalid Request");
                }
                var insuranceCompany = _insuranceCompanyService.GetById(insuranceCompanyId);
                log.CompanyName = insuranceCompany.Key;
                InsuranceCompany result = _insuranceCompanyService.ToggleCompanyActivationByType(isActive: isActive, insuranceCompanyId: insuranceCompanyId,insuranceType);
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(dtBeforeCalling).TotalSeconds;
                log.ErrorCode = 1;
                log.ErrorDescription = "Success";
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Ok(result.ToModel());

            }
            catch (Exception ex)
            {
                log.ErrorCode = 400;
                log.ErrorDescription = ex.ToString();
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Error("an error has occured");
            }

        }
        /// <summary>
        /// check if dll file exist in bin folder or not
        /// </summary>
        /// <param name="fileName"></param>
        /// <returns></returns>
        [NonAction]
        async Task<bool> CheckifFileExist(string fileName)
        {
            string Url = _tameenkConfig.Quotatoin.Url;
            var res= await _client.GetStringAsync(Url + "api/quotation/dll-exist"+"?nameOfFile=" + fileName);
           
                if(JsonConvert.DeserializeObject<CommonResponseModel<bool>>(res).Data)
                {
                    return true;
                }
                

            Url = _tameenkConfig.Policy.PolicyAndInvoiceGeneratorApiUrl;
           res=  await _client.GetStringAsync(Url + "api/policy/dll-exist" + "?nameOfFile=" + fileName);

            if (JsonConvert.DeserializeObject<CommonResponseModel<bool>>(res).Data)
            {
                return true;
            }
            return false;
         
        }

        /// <summary>
        /// Add new insurance company 
        /// </summary>
        /// <param name="insuranceCompanyModel">Insurance Company Model</param>
        /// <param name="replaceFile">Replace File if Exist
        /// <para>(default value (false) not replace and return error)</para> </param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/insurance-company/add")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(CommonResponseModel<InsuranceCompanyModel>))]
        [AdminAuthorizeAttribute(pageNumber: 17)]
        public async Task<IHttpActionResult> AddInsuranceCompany([FromBody]InsuranceCompanyModel insuranceCompanyModel, bool replaceFile=false)
        {
            DateTime dtBeforeCalling = DateTime.Now;
            AdminRequestLog log = new AdminRequestLog();
            log.UserIP = Utilities.GetUserIPAddress();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.PageName = "AddInsurance Company";
            log.PageURL = "AddInsurance Company";
            log.ApiURL = Utilities.GetCurrentURL;
            log.MethodName = "AddInsuranceCompany";
            log.ServiceRequest = JsonConvert.SerializeObject(insuranceCompanyModel);
            log.UserID = User.Identity.GetUserId();
            log.UserName = User.Identity.GetUserName();
            log.RequesterUrl = Utilities.GetUrlReferrer();
            try
            {
                if (Utilities.IsBlockedUser(log.UserName, log.UserID, log.UserAgent))
                {
                    log.ErrorCode = 3;
                    log.ErrorDescription = "User not authorized";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authorized");
                }
                if (!User.Identity.IsAuthenticated)
                {
                    log.ErrorCode = 2;
                    log.ErrorDescription = "User not authenticated";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authenticated");
                }
                var isAuthorized = _userPageService.IsAuthorizedUser(17, log.UserID);
                if (!isAuthorized)
                {
                    log.ErrorCode = 10;
                    log.ErrorDescription = "User not authenticated : " + log.UserID;
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("Not Authorized : " + log.UserID);
                }

                if (insuranceCompanyModel == null)
                {
                    return Error("The Object is Null.");
                }
              
                InsuranceCompany insuranceCompany = insuranceCompanyModel.ToEntity();
                if (insuranceCompanyModel.FileToUpload !=null)
                {
                    try
                    {
                        if (!replaceFile)
                        {
                            if (_insuranceCompanyService.CheckDllExist(insuranceCompanyModel.NamespaceTypeName))
                            {
                                return Error("This File Exist");
                            }
                        }

                        if (await ValidateDllFile(insuranceCompanyModel))
                        {
                          await SaveDLLFile(insuranceCompanyModel);
                        }
                        else
                        {
                            throw new TameenkArgumentException("This File is Invaild.", "DLL File");
                        }
                    }
                    catch (Exception ex)
                    {
                        return Error("an error has occured");
                    }
                }
                insuranceCompany = _insuranceCompanyService.AddInsuranceCompany(insuranceCompany);
                InsuranceCompanyModel res = insuranceCompany.ToModel();
                res.FileToUpload = insuranceCompanyModel.FileToUpload;
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(dtBeforeCalling).TotalSeconds;
                log.ErrorCode = 1;
                log.ErrorDescription = "Success";
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Ok(res);

            }
            catch (Exception ex)
            {
                log.ErrorCode = 400;
                log.ErrorDescription = ex.ToString();
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Error("an error has occured");
            }

        }
        /// <summary>
        /// save dll file in bin ( admin - quotation - policy ) use this function in 
        /// add and edit
        /// </summary>
        /// <param name="insuranceCompanyModel">insurance company Model</param>
        [NonAction]
        async  Task SaveDLLFile(InsuranceCompanyModel insuranceCompanyModel)
        {
            try
            {
                string Url = _tameenkConfig.Quotatoin.Url;

               
                var response = await _client.PostAsync(Url + "api/quotation/dll-file" + "?nameOfFile=" + insuranceCompanyModel.NamespaceTypeName ,insuranceCompanyModel.FileToUpload);

                if (!response.IsSuccessStatusCode)
                {
                    throw new TameenkArgumentNullException("Fail to save dll file in Quotation.");
                }
               

                Url = _tameenkConfig.Policy.PolicyAndInvoiceGeneratorApiUrl;

                response = await _client.PostAsync(Url + "api/policy/dll-file" + "?nameOfFile=" + insuranceCompanyModel.NamespaceTypeName , insuranceCompanyModel.FileToUpload);

                if (!response.IsSuccessStatusCode)
                {
                    Url = _tameenkConfig.Quotatoin.Url;
                    await _client.GetStringAsync(Url + "api/quotation/delete-dll" + "?nameOfFile=" + insuranceCompanyModel.NamespaceTypeName);
                    throw new TameenkArgumentNullException("Fail to save dll file in Policy.");
                }
           

                
            }catch(Exception ex)
            {
                throw new TameenkArgumentException("an error has occured");
            }
        }

        

        /// <summary>
        /// Validate dll file if valid or not
        /// </summary>
        /// <param name="insuranceCompanyModel">Insurance Company Model</param>
        /// <returns></returns>
        [NonAction]
        public async Task<bool> ValidateDllFile(InsuranceCompanyModel insuranceCompanyModel)
        {
            try
            {

                string Url = _tameenkConfig.Quotatoin.Url;
                var response =await _client.PostAsync(Url + "api/quotation/valid-dll" + "?nameSpace=" + insuranceCompanyModel.NamespaceTypeName + "&nameofClass=" + insuranceCompanyModel.ClassTypeName, insuranceCompanyModel.FileToUpload);

                if (response.IsSuccessStatusCode)
                {
                    var quotationResponse = JsonConvert.DeserializeObject<CommonResponseModel<bool>>(response.Content.ReadAsStringAsync().Result).Data;
                if (quotationResponse)
                    return true;

                return false;

                }
                else
                {
                    throw new TameenkArgumentException(response.ReasonPhrase);
                }

                
            }
            catch(Exception ex)
            {
                throw new TameenkArgumentException("an error has occured");
            }
                     
        }
        /// <summary>
        /// Edit insurance company 
        /// </summary>
        /// <param name="insuranceCompanyModel">Insurance Company Model</param>
        /// <returns></returns>
        [HttpPost]
        [Route("api/insurance-company/edit")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(CommonResponseModel<InsuranceCompanyModel>))]
        [AdminAuthorizeAttribute(pageNumber: 17)]
        public async Task<IHttpActionResult> EditInsuranceCompany([FromBody]InsuranceCompanyModel insuranceCompanyModel)
        {
            DateTime dtBeforeCalling = DateTime.Now;
            AdminRequestLog log = new AdminRequestLog();
            log.UserIP = Utilities.GetUserIPAddress();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.PageName = "Insurance Companies";
            log.PageURL = "Insurance Companies";
            log.ApiURL = Utilities.GetCurrentURL;
            log.MethodName = "EditInsuranceCompany";
            log.ServiceRequest = JsonConvert.SerializeObject(insuranceCompanyModel);
            log.UserID = User.Identity.GetUserId();
            log.UserName = User.Identity.GetUserName();
            log.RequesterUrl = Utilities.GetUrlReferrer();
            try
            {
                if (Utilities.IsBlockedUser(log.UserName, log.UserID, log.UserAgent))
                {
                    log.ErrorCode = 3;
                    log.ErrorDescription = "User not authorized";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authorized");
                }
                if (!User.Identity.IsAuthenticated)
                {
                    log.ErrorCode = 2;
                    log.ErrorDescription = "User not authenticated";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authenticated");
                }
                var isAuthorized = _userPageService.IsAuthorizedUser(17, log.UserID);
                if (!isAuthorized)
                {
                    log.ErrorCode = 10;
                    log.ErrorDescription = "User not authenticated : " + log.UserID;
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("Not Authorized : " + log.UserID);
                }
                if (insuranceCompanyModel==null)
                {
                    return Error("The Object is Null.");
                }
                 
                if (insuranceCompanyModel.InsuranceCompanyID <= 0)
                    throw new TameenkArgumentException("The insurance company id should be positive integer.", "insuranceCompanyId");
                log.CompanyID = insuranceCompanyModel.InsuranceCompanyID;
                InsuranceCompany insuranceCompany = _CO.Table.Where(x => x.InsuranceCompanyID == insuranceCompanyModel.InsuranceCompanyID).FirstOrDefault();// _insuranceCompanyService.GetById(insuranceCompanyModel.InsuranceCompanyID);


                if (insuranceCompany == null)
                    throw new TameenkArgumentException("The insurance company not found in DB", "insuranceCompanyId");

                if (insuranceCompanyModel.FileToUpload != null)
                {
                    try
                    {
                        
                        if (await ValidateDllFile(insuranceCompanyModel)) { 
                           await SaveDLLFile(insuranceCompanyModel);
                        }
                        else
                        {
                            throw new TameenkArgumentException("This File is Invaild", "File");
                        }

                        InsuranceCompanyModel insurance = insuranceCompany.ToModel();
                        insurance.FileToUpload = insuranceCompanyModel.FileToUpload;
                        return Ok(insurance);
                    }
                    catch (Exception ex)
                    {
                        return Error("an error has occured");
                    }
                }

                //if (insuranceCompanyModel.TermsAndConditionsFile != null)
                //{
                //    try
                //    {
                //        var tameenkDirectoryPath = Utilities.GetAppSetting("TameenkDirectoryPath");
                //        var companiesPolicyDirectoryPath = Utilities.GetAppSetting("CompaniesTermsAndConditionsPath");
                //        var directoryPath = (tameenkDirectoryPath + companiesPolicyDirectoryPath).Replace(@"\", @"//");
                //        //var fileName = (insuranceCompany.NameEN.Contains(' ')) ? insuranceCompany.NameEN.Split(' ')[0] : insuranceCompany.NameEN;
                //        var fileName = insuranceCompany.Key;
                //        var fileExt = ".pdf";
                //        var termsFileDirectoryFullPath = directoryPath + fileName + fileExt;
                //        File.WriteAllBytes(termsFileDirectoryFullPath, insuranceCompanyModel.TermsAndConditionsFile);

                //        var termsFileDBPath = companiesPolicyDirectoryPath.Replace(@"\\", @"\") + fileName + fileExt;
                //        insuranceCompany.TermsAndConditionsFilePath = termsFileDBPath;
                //    }
                //    catch (Exception ex)
                //    {
                //        return Error(ex.Message);
                //    }
                //}
                int contactid , addrrid ;
                if (insuranceCompanyModel.Contact.Id == 0)//insert into contact 
                {
                    var contact = new Contact();
                    contact.HomePhone = insuranceCompanyModel.Contact.HomePhone;
                    contact.Email = insuranceCompanyModel.Contact.Email;
                    contact.Fax = insuranceCompanyModel.Contact.Fax;
                    contact.MobileNumber = insuranceCompanyModel.Contact.MobileNumber;
                    _contact.Insert(contact);
                    var newcontant = _contact.TableNoTracking.Where(x => x.Email == insuranceCompanyModel.Contact.Email && x.Fax == insuranceCompanyModel.Contact.Fax &&
                      x.HomePhone == insuranceCompanyModel.Contact.HomePhone && x.MobileNumber == insuranceCompanyModel.Contact.MobileNumber).FirstOrDefault();
                      insuranceCompanyModel.Contact.Id = contact.Id;
                    contactid = contact.Id == 0 ? newcontant.Id : contact.Id ;
                }
                else 
                {
                    var contact = _contact.Table.Where(x => x.Id == insuranceCompanyModel.Contact.Id).FirstOrDefault();
                    contact.HomePhone = insuranceCompanyModel.Contact.HomePhone;
                    contact.Email = insuranceCompanyModel.Contact.Email;
                    contact.Fax = insuranceCompanyModel.Contact.Fax;
                    contact.MobileNumber = insuranceCompanyModel.Contact.MobileNumber;
                    _contact.Update(contact);
                    contactid = contact.Id;
                }
                if (insuranceCompanyModel.Address.Id==0)// insert new address
                {
                    var addr = new Address();
                    addr.Address1 = insuranceCompanyModel.Address.Address1;
                    addr.Address2 = insuranceCompanyModel.Address.Address2;
                    addr.RegionName = insuranceCompanyModel.Address.RegionName;
                    addr.PostCode = insuranceCompanyModel.Address.PostCode;
                    addr.AdditionalNumber = insuranceCompanyModel.Address.AdditionalNumber;
                    addr.City = insuranceCompanyModel.Address.City;
                    addr.District = insuranceCompanyModel.Address.District;
                    addr.Street = insuranceCompanyModel.Address.Street;
                    addr.BuildingNumber = insuranceCompanyModel.Address.BuildingNumber;

                    _address.Insert(addr);

                    insuranceCompanyModel.Address.Id = addr.Id;
                   addrrid = addr.Id;
                }
                else 
                {
                    var addr = _address.Table.Where(x => x.Id == insuranceCompanyModel.Address.Id).FirstOrDefault();

                    addr.Address1 = insuranceCompanyModel.Address.Address1;
                    addr.Address2 = insuranceCompanyModel.Address.Address2;
                    addr.RegionName = insuranceCompanyModel.Address.RegionName;
                    addr.PostCode = insuranceCompanyModel.Address.PostCode;
                    addr.AdditionalNumber = insuranceCompanyModel.Address.AdditionalNumber;
                    addr.City = insuranceCompanyModel.Address.City;
                    addr.District = insuranceCompanyModel.Address.District;
                    addr.Street = insuranceCompanyModel.Address.Street;
                    addr.BuildingNumber = insuranceCompanyModel.Address.BuildingNumber;

                    _address.Update(addr);
                    addrrid = addr.Id;
                }
                
                insuranceCompany.ContactId = insuranceCompanyModel.Contact?.Id;
                insuranceCompany.AddressId = insuranceCompanyModel.Address?.Id;
                insuranceCompany.Key = insuranceCompanyModel.Key;
                insuranceCompany.NamespaceTypeName = insuranceCompanyModel.NamespaceTypeName;
                insuranceCompany.ClassTypeName =     insuranceCompanyModel.ClassTypeName;
                insuranceCompany.ReportTemplateName = insuranceCompanyModel.ReportTemplateName;
                insuranceCompany.DescEN =             insuranceCompanyModel.DescEN;
                insuranceCompany.DescAR = insuranceCompanyModel.DescAR;
                insuranceCompany.IsActive = insuranceCompanyModel.IsActive;
                insuranceCompany.HasDiscount = insuranceCompanyModel.HasDiscount;
                insuranceCompany.DiscountText = insuranceCompanyModel.DiscountText;
                insuranceCompany.DiscountEndDate = insuranceCompanyModel.DiscountEndDate;
                insuranceCompany.DiscountStartDate = insuranceCompanyModel.DiscountStartDate;
                insuranceCompany.UsePhoneCamera = insuranceCompanyModel.UsePhoneCamera;
                insuranceCompany.PolicyFailureRecipient = insuranceCompanyModel.PolicyFailureRecipient;
                insuranceCompany.IsUseNumberOfAccident = insuranceCompanyModel.IsUseNumberOfAccident;
                insuranceCompany.NajmNcdFreeYearsToUseNumberOfAccident = insuranceCompanyModel.NajmNcdFreeYearsToUseNumberOfAccident;
                insuranceCompany.AllowAnonymousRequest = insuranceCompanyModel.AllowAnonymousRequest;
                insuranceCompany.ShowQuotationToUser = insuranceCompanyModel.ShowQuotationToUser;
                insuranceCompany.VAT = insuranceCompanyModel.VAT;
                insuranceCompany.IsAddressValidationEnabled = insuranceCompanyModel.IsAddressValidationEnabled;
                insuranceCompany.Order = insuranceCompanyModel.Order;

                _CO.Update(insuranceCompany);
                 
                log.CompanyName = insuranceCompany.Key;
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(dtBeforeCalling).TotalSeconds;
                log.ErrorCode = 1;
                log.ErrorDescription = "Success";
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Ok(insuranceCompany.ToModel());
            }
            catch (Exception ex)
            {
                log.ErrorCode = 400;
                log.ErrorDescription = ex.ToString();
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Error("an error has occured");
            }

        }

       
        /// <summary>
        /// Get Insurance Company Model by id
        /// </summary>
        /// <param name="id">Id</param>
        /// <returns></returns>
        [HttpGet]
        [Route("api/insurance-company/get-company")]
        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(CommonResponseModel<InsuranceCompanyModel>))]
        [AdminAuthorizeAttribute(pageNumber: 0)]
        public IHttpActionResult GetCompanyById(int id)
        {
            try
            {
                if (id <= 0)
                    throw new TameenkArgumentException("The insurance company id should be positive integer.", "insuranceCompanyId");

                InsuranceCompany _insuranceCompany =_insuranceCompanyService.GetById(id);
               
                if (_insuranceCompany==null)
                        throw new TameenkArgumentException("The insurance company not found in DB", "insuranceCompanyId");

                return Ok(_insuranceCompany.ToModel());
            }
            catch (Exception ex)
            {
                return Error("an error has occured");
            }

        }

        /// <summary>        /// change state of company address validation ( Active / deactive )        /// </summary>        /// <param name="isActive">is Active</param>        /// <param name="insuranceCompanyId">insurance company id</param>        /// <returns></returns>        [HttpGet]        [Route("api/insurance-company/change-address-validation-state")]        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(CommonResponseModel<InsuranceCompanyModel>))]        [AdminAuthorizeAttribute(pageNumber: 17)]        public IHttpActionResult ToggleCompanyAddressValidationActivation(bool isActive, int insuranceCompanyId)        {            DateTime dtBeforeCalling = DateTime.Now;
            AdminRequestLog log = new AdminRequestLog();
            log.UserIP = Utilities.GetUserIPAddress();
            log.ServerIP = Utilities.GetInternalServerIP();
            log.UserAgent = Utilities.GetUserAgent();
            log.CompanyID = insuranceCompanyId;
            log.PageName = "Insurance Companies";
            log.PageURL = "Insurance Companies";
            log.ApiURL = Utilities.GetCurrentURL;
            log.MethodName = "ToggleCompanyAddressValidationActivation";
            log.ServiceRequest = $"isActive: {isActive}, insuranceCompanyId: {insuranceCompanyId}";
            log.UserID = User.Identity.GetUserId();
            log.UserName = User.Identity.GetUserName();
            log.RequesterUrl = Utilities.GetUrlReferrer();
            try            {
                if (Utilities.IsBlockedUser(log.UserName, log.UserID, log.UserAgent))
                {
                    log.ErrorCode = 3;
                    log.ErrorDescription = "User not authorized";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authorized");
                }
                if (!User.Identity.IsAuthenticated)
                {
                    log.ErrorCode = 2;
                    log.ErrorDescription = "User not authenticated";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("User not authenticated");
                }
                var isAuthorized = _userPageService.IsAuthorizedUser(17, log.UserID);
                if (!isAuthorized)
                {
                    log.ErrorCode = 10;
                    log.ErrorDescription = "User not authenticated : " + log.UserID;
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("Not Authorized : " + log.UserID);
                }
                if (insuranceCompanyId == 0)
                {
                    log.ErrorCode = 4;
                    log.ErrorDescription = "Invalid request";
                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                    return Error("Invalid Request");
                }                InsuranceCompany result = _insuranceCompanyService.ToggleCompanyAddressValidationActivation(isActive: isActive, insuranceCompanyId: insuranceCompanyId);
                log.CompanyName = result.Key;
                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(dtBeforeCalling).TotalSeconds;
                log.ErrorCode = 1;
                log.ErrorDescription = "Success";
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);                return Ok(result.ToModel());            }            catch (Exception ex)            {                log.ErrorCode = 400;
                log.ErrorDescription = ex.ToString();
                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);
                return Error("an error has occured");            }        }


        [HttpGet]        [Route("api/insurance-company/active-state-tabby")]        [SwaggerResponse(HttpStatusCode.OK, Type = typeof(CommonResponseModel<InsuranceCompanyModel>))]        [AdminAuthorizeAttribute(pageNumber: 17)]        public IHttpActionResult ToggleCompanyActivationTabby(bool isActive, int insuranceCompanyId, int insuranceType)        {            DateTime dtBeforeCalling = DateTime.Now;            AdminRequestLog log = new AdminRequestLog();            log.UserIP = Utilities.GetUserIPAddress();            log.ServerIP = Utilities.GetInternalServerIP();            log.UserAgent = Utilities.GetUserAgent();            log.CompanyID = insuranceCompanyId;            log.PageName = "Insurance Companies";            log.PageURL = "Insurance Companies";            log.ApiURL = Utilities.GetCurrentURL;            log.MethodName = "ToggleCompanyActivationTabby";            log.ServiceRequest = $"Tabby isActive: {isActive}, insuranceCompanyId: {insuranceCompanyId} , insuranceType: {insuranceType}";            log.UserID = User.Identity.GetUserId();            log.UserName = User.Identity.GetUserName();            log.RequesterUrl = Utilities.GetUrlReferrer();            try            {                if (Utilities.IsBlockedUser(log.UserName, log.UserID, log.UserAgent))                {                    log.ErrorCode = 3;                    log.ErrorDescription = "User not authorized";                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);                    return Error("User not authorized");                }                if (!User.Identity.IsAuthenticated)                {                    log.ErrorCode = 2;                    log.ErrorDescription = "User not authenticated";                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);                    return Error("User not authenticated");                }                var isAuthorized = _userPageService.IsAuthorizedUser(17, log.UserID);                if (!isAuthorized)                {                    log.ErrorCode = 10;                    log.ErrorDescription = "User not authorized : " + log.UserID;                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);                    return Error("Not Authorized : " + log.UserID);                }                if (insuranceCompanyId <= 0)                {                    log.ErrorCode = 4;                    log.ErrorDescription = "Invalid request";                    AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);                    return Error("Invalid Request");                }                InsuranceCompany result = _insuranceCompanyService.ToggleCompanyActivationTabby(isActive, insuranceCompanyId, insuranceType);                log.CompanyName = result.Key;                log.ServiceResponseTimeInSeconds = DateTime.Now.Subtract(dtBeforeCalling).TotalSeconds;                log.ErrorCode = 1;                log.ErrorDescription = "Success";                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);                return Ok(result.ToModel());            }            catch (Exception ex)            {
                log.ErrorCode = 400;                log.ErrorDescription = ex.ToString();                AdminRequestLogDataAccess.AddtoServiceRequestLogs(log);                return Error("an error has occured");            }        }
        #endregion
    }

}