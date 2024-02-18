//using HealthCare.Data;
//using HealthCare.Data.BLL;
//using HealthCare.Entities;
//using Microsoft.AspNet.Identity.Owin;
//using Microsoft.Owin.Security;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Net;
//using System.Net.Http;
//using System.Web.Http;

//namespace Tameenk.Services.AdministrationApi.Controllers
//{
//    [RoutePrefix("api/UserRoles")]
//    public class UserRoleController : ApiController
//    {
//        private UserRoleBLL _UserRoleBLL;

//        [Route("list/{Id:int}")]
//        [Authorize(Roles = HealthCareContext.RoleList.UserRolesView)]
//        public IHttpActionResult GetUserRoles(int Id)
//        {
//            using (_UserRoleBLL = new UserRoleBLL())
//            {
//                var list = _UserRoleBLL.GetAll(u=>u.UserId == Id);

//                return Ok(list);
//            }
//        }

//        [Route("save")]
//        [Authorize(Roles = HealthCareContext.RoleList.UserRolesSave)]
//        public IHttpActionResult AddUserRole(List<UserRole> UserRoles)
//        {
//            using (_UserRoleBLL = new UserRoleBLL())
//            {
//                if (ModelState.IsValid)
//                {
//                    var result = _UserRoleBLL.SaveRoles(UserRoles);
//                    if (result > 0)
//                    {
//                        return Ok(true);
//                    }
//                }
//                return Ok(false);
//            }
//        }
//    }
//}
