using System;
using System.Text;
using System.Collections.Generic;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Autofac.Extras.Moq;
using Tameenk.Core.Data;
using Tameenk.Core.Domain.Entities.PromotionPrograms;
using System.Linq;
using Tameenk.Services.Implementation.Promotions;
using Moq;
using Tameenk.Core.Exceptions;

namespace Tameenk.Services.Test.Promotions
{
    [TestClass]
    public class PromotionServiceTest
    {

        #region GetPromotionProgram Test Cases


        [TestMethod]
        public void TestGetPromotionProgram()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgram> promotionPrograms = new List<PromotionProgram>
                {
                    new PromotionProgram()
                    {
                        Id = 1
                    }
                };
                mock.Mock<IRepository<PromotionProgram>>().Setup(x => x.Table).Returns(() => promotionPrograms.AsQueryable());
                var promotionService = mock.Create<PromotionService>();
                var promotionProgram = promotionService.GetPromotionProgram(1);
                Assert.IsNotNull(promotionProgram, "The promotion program is null.");
            }
        }

        [TestMethod]
        public void TestGetPromotionProgram_WithFakeId()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgram> promotionPrograms = new List<PromotionProgram>
                {
                    new PromotionProgram()
                    {
                        Id = 1
                    }
                };
                mock.Mock<IRepository<PromotionProgram>>().Setup(x => x.Table).Returns(() => promotionPrograms.AsQueryable());
                var promotionService = mock.Create<PromotionService>();
                var promotionProgram = promotionService.GetPromotionProgram(10);
                Assert.IsNull(promotionProgram, "The promotion program should be null.");
            }
        }

        #endregion

        #region GetPromotionPrograms Test Cases


        [TestMethod]
        public void TestGetPromotionPrograms_With_OnlyActive()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgram> promotionPrograms = new List<PromotionProgram>
                {
                    new PromotionProgram()
                    {
                        Id = 1,
                        IsActive =true
                    },
                    new PromotionProgram()
                    {
                        Id = 2,
                        IsActive = false
                    }
                };
                mock.Mock<IRepository<PromotionProgram>>().Setup(x => x.Table).Returns(() => promotionPrograms.AsQueryable());
                var promotionService = mock.Create<PromotionService>();
                var result = promotionService.GetPromotionPrograms();
                Assert.IsNotNull(result, "The promotion programs shouldn't be null.");
            }
        }


        [TestMethod]
        public void TestGetPromotionPrograms()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgram> promotionPrograms = new List<PromotionProgram>
                {
                    new PromotionProgram()
                    {
                        Id = 1,
                        IsActive =true
                    },
                    new PromotionProgram()
                    {
                        Id = 2,
                        IsActive = false
                    }
                };
                mock.Mock<IRepository<PromotionProgram>>().Setup(x => x.Table).Returns(() => promotionPrograms.AsQueryable());
                var promotionService = mock.Create<PromotionService>();
                var result = promotionService.GetPromotionPrograms(false);
                Assert.AreEqual(result.Count, promotionPrograms.Count, "The promotion programs should be 2 programs");
            }
        }

        [TestMethod]
        public void TestGetPromotionPrograms_With_OnlyActive_ReturnOneActiveProgram()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgram> promotionPrograms = new List<PromotionProgram>
                {
                    new PromotionProgram()
                    {
                        Id = 1,
                        IsActive =true
                    },
                    new PromotionProgram()
                    {
                        Id = 2,
                        IsActive = false
                    }
                };
                mock.Mock<IRepository<PromotionProgram>>().Setup(x => x.Table).Returns(() => promotionPrograms.AsQueryable());
                var promotionService = mock.Create<PromotionService>();
                var result = promotionService.GetPromotionPrograms();
                Assert.AreEqual(result.Count, 1, "Results should be only 1 active program.");
            }
        }


        [TestMethod]
        public void TestGetPromotionPrograms_With_Paging()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgram> promotionPrograms = new List<PromotionProgram>
                {
                    new PromotionProgram()
                    {
                        Id = 1,
                        IsActive =true
                    },
                    new PromotionProgram()
                    {
                        Id = 2,
                        IsActive = false
                    }
                };
                mock.Mock<IRepository<PromotionProgram>>().Setup(x => x.Table).Returns(() => promotionPrograms.AsQueryable());
                var promotionService = mock.Create<PromotionService>();
                var result = promotionService.GetPromotionPrograms(false, 0, int.MaxValue);
                Assert.AreEqual(result.Count, promotionPrograms.Count, "Results should return all active programs.");
            }
        }

        [TestMethod]
        public void TestGetPromotionPrograms_With_PagingRange()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgram> promotionPrograms = new List<PromotionProgram>
                {
                    new PromotionProgram()
                    {
                        Id = 1,
                        IsActive =true
                    },
                    new PromotionProgram()
                    {
                        Id = 2,
                        IsActive = false
                    }
                };
                mock.Mock<IRepository<PromotionProgram>>().Setup(x => x.Table).Returns(() => promotionPrograms.AsQueryable());
                var promotionService = mock.Create<PromotionService>();
                var result = promotionService.GetPromotionPrograms(false, 0, 1);
                Assert.AreEqual(result.Count, 1, "Results should be only program.");
            }
        }

        [TestMethod]
        public void TestGetPromotionPrograms_With_PagingWithActiveOnly()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgram> promotionPrograms = new List<PromotionProgram>
                {
                    new PromotionProgram()
                    {
                        Id = 1,
                        IsActive =true
                    },
                    new PromotionProgram()
                    {
                        Id = 2,
                        IsActive = false
                    }
                };
                mock.Mock<IRepository<PromotionProgram>>().Setup(x => x.Table).Returns(() => promotionPrograms.AsQueryable());
                var promotionService = mock.Create<PromotionService>();
                var result = promotionService.GetPromotionPrograms(true, 0, 1);
                Assert.AreEqual(result.Count, 1, "Results should be only program.");
            }
        }

        #endregion

        #region AddUserToPromotionProgram Test Cases


        [TestMethod]
        public void Test_AddUserToPromotionProgram()
        {
            using (var mock = AutoMock.GetLoose())
            {
                var promotionService = mock.Create<PromotionService>();
                var result = promotionService.AddUserToPromotionProgram("123456", "a@a.com", 1);
                mock.Mock<IRepository<PromotionProgramUser>>().Verify(x => x.Insert(
                    It.Is<PromotionProgramUser>(pu => pu.UserId == "123456" && pu.Email == "a@a.com" && pu.PromotionProgramId == 1))
                    , Times.Once());
            }
        }

        [TestMethod]
        [ExpectedException(typeof(TameenkArgumentException),
            "AddUserToPromotionProgram should not accept zero program Id.")]
        public void Test_AddUserToPromotionProgram_WithZeroProgramId()
        {
            using (var mock = AutoMock.GetLoose())
            {
                var promotionService = mock.Create<PromotionService>();
                promotionService.AddUserToPromotionProgram("123456", "a@a.com", 0);
            }
        }


        [TestMethod]
        [ExpectedException(typeof(TameenkArgumentNullException),
            "AddUserToPromotionProgram should not accept empty user Id.")]
        public void Test_AddUserToPromotionProgram_WithEmptyUserId()
        {
            using (var mock = AutoMock.GetLoose())
            {
                var promotionService = mock.Create<PromotionService>();
                promotionService.AddUserToPromotionProgram("", "a@a.com", 1);
            }
        }


        [TestMethod]
        [ExpectedException(typeof(TameenkArgumentNullException),
            "AddUserToPromotionProgram should not accept empty email.")]
        public void Test_AddUserToPromotionProgram_WithEmptyEmail()
        {
            using (var mock = AutoMock.GetLoose())
            {
                var promotionService = mock.Create<PromotionService>();
                promotionService.AddUserToPromotionProgram("1213456", "", 1);
            }
        }

        #endregion

        #region IsUserDomainExistInProgramDomains Test Cases

        [TestMethod]
        public void Test_IsUserDomainExistInProgramDomains()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramDomain> domains = new List<PromotionProgramDomain>
                {
                    new PromotionProgramDomain()
                    {
                       Domian = "bcare.com.sa",
                       PromotionProgramId = 1
                    },
                    new PromotionProgramDomain
                    {
                          Domian = "a.net",
                       PromotionProgramId = 2
                    }
                };
                mock.Mock<IRepository<PromotionProgramDomain>>().Setup(x => x.Table).Returns(() => domains.AsQueryable());
                var promotionService = mock.Create<PromotionService>();
                var result = promotionService.IsUserDomainExistInProgramDomains("s@bcare.com.sa", 1);
                Assert.IsTrue(result == true, "User domain should exist in the given program's domains");
            }
        }

        [TestMethod]
        public void Test_IsUserDomainExistInProgramDomains_WithFakeDomain()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramDomain> domains = new List<PromotionProgramDomain>
                {
                    new PromotionProgramDomain()
                    {
                       Domian = "bcare.com.sa",
                       PromotionProgramId = 1
                    },
                    new PromotionProgramDomain
                    {
                          Domian = "a.net",
                       PromotionProgramId = 2
                    }
                };
                mock.Mock<IRepository<PromotionProgramDomain>>().Setup(x => x.Table).Returns(() => domains.AsQueryable());
                var promotionService = mock.Create<PromotionService>();
                var result = promotionService.IsUserDomainExistInProgramDomains("s@ssbcare.com.sa", 1);
                Assert.IsTrue(result == false, "User domain should not exist in the given program's domains.");
            }
        }


        [TestMethod]
        [ExpectedException(typeof(TameenkArgumentNullException),
            "IsUserDomainExistInProgramDomains should not accept empty email.")]
        public void Test_IsUserDomainExistInProgramDomains_WithEmptyEmail()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramDomain> domains = new List<PromotionProgramDomain>
                {
                    new PromotionProgramDomain()
                    {
                       Domian = "bcare.com.sa",
                       PromotionProgramId = 1
                    },
                    new PromotionProgramDomain
                    {
                          Domian = "a.net",
                       PromotionProgramId = 2
                    }
                };
                mock.Mock<IRepository<PromotionProgramDomain>>().Setup(x => x.Table).Returns(() => domains.AsQueryable());
                var promotionService = mock.Create<PromotionService>();
                promotionService.IsUserDomainExistInProgramDomains("", 1);
            }
        }


        [TestMethod]
        [ExpectedException(typeof(TameenkArgumentException),
            "IsUserDomainExistInProgramDomains should not accept empty email.")]
        public void Test_IsUserDomainExistInProgramDomains_WithInvalidProgramId()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramDomain> domains = new List<PromotionProgramDomain>
                {
                    new PromotionProgramDomain()
                    {
                       Domian = "bcare.com.sa",
                       PromotionProgramId = 1
                    },
                    new PromotionProgramDomain
                    {
                          Domian = "a.net",
                       PromotionProgramId = 2
                    }
                };
                mock.Mock<IRepository<PromotionProgramDomain>>().Setup(x => x.Table).Returns(() => domains.AsQueryable());
                var promotionService = mock.Create<PromotionService>();
                promotionService.IsUserDomainExistInProgramDomains("s@ssbcare.com.sa", -5);
            }
        }

        #endregion

        #region GetPromotionProgramUser Test Cases

        [TestMethod]
        public void Test_GetPromotionProgramUser()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser()
                    {
                       UserId="123",
                       PromotionProgramId = 1
                    }
                };
                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());
                var promotionService = mock.Create<PromotionService>();
                var result = promotionService.GetPromotionProgramUser("123");
                Assert.IsNotNull(result, "GetPromotionProgramUser should return promotion program user.");
            }
        }


        [TestMethod]
        public void Test_GetPromotionProgramUser_WithInvalidUserId()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser()
                    {
                       UserId="123",
                       PromotionProgramId = 1
                    }
                };
                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());
                var promotionService = mock.Create<PromotionService>();
                var result = promotionService.GetPromotionProgramUser("456");
                Assert.IsNull(result, "GetPromotionProgramUser should not return promotion program user.");
            }
        }


        [TestMethod]
        [ExpectedException(typeof(TameenkArgumentNullException),
            "GetPromotionProgramUser should not accept empty user id.")]
        public void Test_GetPromotionProgramUser_WithEmptyUserId()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser()
                    {
                       UserId="123",
                       PromotionProgramId = 1
                    }
                };
                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());
                var promotionService = mock.Create<PromotionService>();
                promotionService.GetPromotionProgramUser("");
            }
        }

        #endregion

        #region UpdatePromotionProgramUser Test Cases

        [TestMethod]
        public void Test_UpdatePromotionProgramUser()
        {
            using (var mock = AutoMock.GetLoose())
            {
                var promotionService = mock.Create<PromotionService>();
                var progUSer = new PromotionProgramUser
                {
                    UserId = "123",
                    PromotionProgramId = 1,
                    Email = "test@test.com"
                };

                var result = promotionService.UpdatePromotionProgramUser(progUSer);
                mock.Mock<IRepository<PromotionProgramUser>>().Verify(x => x.Update(
                    It.Is<PromotionProgramUser>(pu => pu.UserId == "123" && pu.Email == "test@test.com" && pu.PromotionProgramId == 1))
                    , Times.Once());
            }
        }


        [TestMethod]
        [ExpectedException(typeof(TameenkArgumentNullException),
            "UpdatePromotionProgramUser should not accept empty entity.")]
        public void Test_UpdatePromotionProgramUser_WithNullUser()
        {
            using (var mock = AutoMock.GetLoose())
            {
                var promotionService = mock.Create<PromotionService>();

                var result = promotionService.UpdatePromotionProgramUser(null);
                mock.Mock<IRepository<PromotionProgramUser>>().Verify(x => x.Update(
                    It.Is<PromotionProgramUser>(pu => pu.UserId == "123" && pu.Email == "test@test.com" && pu.PromotionProgramId == 1))
                    , Times.Once());
            }
        }

        #endregion

        #region ConfirmUserJoinProgram Test Cases

        [TestMethod]
        public void Test_ConfirmUserJoinProgram()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser
                    {
                        UserId = "123",
                        PromotionProgramId = 1,
                        Email = "test@test.com"
                    },
                    new PromotionProgramUser
                    {
                         UserId = "456",
                        PromotionProgramId = 2,
                        Email = "test2@test.com"
                    }
                };

                var promotionService = mock.Create<PromotionService>();

                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());

                promotionService.ConfirmUserJoinProgram("123", 1, "test@test.com");
                mock.Mock<IRepository<PromotionProgramUser>>().Verify(x => x.Update(
                    It.Is<PromotionProgramUser>(pu => pu.UserId == "123" && pu.Email == "test@test.com" && pu.PromotionProgramId == 1 && pu.EmailVerified == true))
                    , Times.Once());
            }
        }


        [TestMethod]
        [ExpectedException(typeof(TameenkArgumentNullException),
            "ConfirmUserJoinProgram should not accept empty user id.")]
        public void Test_ConfirmUserJoinProgram_WithEmptyUserId()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser
                    {
                        UserId = "123",
                        PromotionProgramId = 1,
                        Email = "test@test.com"
                    }
                };
                var promotionService = mock.Create<PromotionService>();
                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());

                promotionService.ConfirmUserJoinProgram("", 1, "test@test.com");
            }
        }

        [TestMethod]
        [ExpectedException(typeof(TameenkArgumentNullException),
            "ConfirmUserJoinProgram should not accept empty email.")]
        public void Test_ConfirmUserJoinProgram_WithEmptyEmail()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser
                    {
                        UserId = "123",
                        PromotionProgramId = 1,
                        Email = "test@test.com"
                    }
                };
                var promotionService = mock.Create<PromotionService>();
                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());

                promotionService.ConfirmUserJoinProgram("123", 1, "");
            }
        }



        [TestMethod]
        [ExpectedException(typeof(TameenkArgumentException),
            "ConfirmUserJoinProgram should not accept program id less than 1.")]
        public void Test_ConfirmUserJoinProgram_WithZeroProgramId()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser
                    {
                        UserId = "123",
                        PromotionProgramId = 1,
                        Email = "test@test.com"
                    }
                };
                var promotionService = mock.Create<PromotionService>();
                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());

                promotionService.ConfirmUserJoinProgram("123", 0, "test@test.com");
            }
        }

        [TestMethod]
        [ExpectedException(typeof(TameenkEntityNotFoundException),
             "ConfirmUserJoinProgram should throw entity not found with given data.")]
        public void Test_ConfirmUserJoinProgram_WithUserIdNotExist()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser
                    {
                        UserId = "123",
                        PromotionProgramId = 1,
                        Email = "test@test.com"
                    }
                };
                var promotionService = mock.Create<PromotionService>();
                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());

                promotionService.ConfirmUserJoinProgram("456", 1, "test@test.com");
            }
        }

        #endregion

        #region EnrollUSerToPromotionProgram Test Cases

        [TestMethod]
        public void Test_EnrollUSerToPromotionProgram_AddUserCase()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser
                    {
                        UserId = "123",
                        PromotionProgramId = 1,
                        Email = "test@test.com"
                    }
                };

                var promotionService = mock.Create<PromotionService>();

                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());

                var result = promotionService.EnrollUSerToPromotionProgram("xxx", 1, "test@test.com");

                mock.Mock<IRepository<PromotionProgramUser>>().Verify(x => x.Insert(
                    It.Is<PromotionProgramUser>(pu => pu.UserId == "xxx" && pu.Email == "test@test.com" && pu.PromotionProgramId == 1))
                    , Times.Once());
                Assert.AreEqual(result.UserEndrollerd, true, "User should be enrolled.");
            }
        }


        [TestMethod]
        public void Test_EnrollUSerToPromotionProgram_UppdateUserCase()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser
                    {
                        UserId = "123",
                        PromotionProgramId = 1,
                        Email = "test@test.com"
                    }
                };
                var promotionService = mock.Create<PromotionService>();

                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());

                var result = promotionService.EnrollUSerToPromotionProgram("123", 1, "test@test.com");
                mock.Mock<IRepository<PromotionProgramUser>>().Verify(x => x.Update(
                    It.Is<PromotionProgramUser>(pu => pu.UserId == "123" && pu.Email == "test@test.com" && pu.PromotionProgramId == 1))
                    , Times.Once());
                Assert.AreEqual(result.UserEndrollerd, true, "User should be enrolled.");
            }
        }

        [TestMethod]
        public void Test_EnrollUSerToPromotionProgram_UserAlreadyJoinedCase()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser
                    {
                        UserId = "123",
                        PromotionProgramId = 1,
                        Email = "test@test.com",
                        EmailVerified = true
                    }
                };
                var promotionService = mock.Create<PromotionService>();

                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());

                var result = promotionService.EnrollUSerToPromotionProgram("123", 1, "test@test.com");
                Assert.AreEqual(result.UserEndrollerd, false, "User should not be enrolled.");
                Assert.IsNotNull(result.Errors, "There should be error message tell user that he already joined another program.");
                Assert.AreEqual(result.Errors[0].Description, "This uer already joined a promotion program. Please exist your current promotion program then try again.");
            }
        }


        [TestMethod]
        [ExpectedException(typeof(TameenkArgumentNullException),
             "EnrollUSerToPromotionProgram should not accept empty user id.")]
        public void Test_EnrollUSerToPromotionProgram_WithEmptyUserId()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser
                    {
                        UserId = "123",
                        PromotionProgramId = 1,
                        Email = "test@test.com",
                        EmailVerified = true
                    }
                };
                var promotionService = mock.Create<PromotionService>();

                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());
                promotionService.EnrollUSerToPromotionProgram("", 1, "test@test.com");
            }
        }


        [TestMethod]
        [ExpectedException(typeof(TameenkArgumentNullException),
            "EnrollUSerToPromotionProgram should not accept empty email.")]
        public void Test_EnrollUSerToPromotionProgram_WithEmptyEmail()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser
                    {
                        UserId = "123",
                        PromotionProgramId = 1,
                        Email = "test@test.com",
                        EmailVerified = true
                    }
                };
                var promotionService = mock.Create<PromotionService>();

                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());
                promotionService.EnrollUSerToPromotionProgram("123", 1, "");
            }
        }

        [TestMethod]
        [ExpectedException(typeof(TameenkArgumentException),
            "EnrollUSerToPromotionProgram should not accept program id less than 1.")]
        public void Test_EnrollUSerToPromotionProgram_WithZeroProgramId()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser
                    {
                        UserId = "123",
                        PromotionProgramId = 1,
                        Email = "test@test.com",
                        EmailVerified = true
                    }
                };
                var promotionService = mock.Create<PromotionService>();

                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());
                promotionService.EnrollUSerToPromotionProgram("123", 0, "test@test.com");
            }
        }


        #endregion

        #region DisenrollUserFromPromotionProgram Test Cases

        [TestMethod]
        public void Test_DisenrollUserFromPromotionProgram()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser
                    {
                        UserId = "123",
                        PromotionProgramId = 1,
                        Email = "test@test.com",
                        EmailVerified = true
                    }
                };

                var promotionService = mock.Create<PromotionService>();

                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());

                promotionService.DisenrollUserFromPromotionProgram("123");

                mock.Mock<IRepository<PromotionProgramUser>>().Verify(x => x.Delete(
                    It.Is<PromotionProgramUser>(pu => pu.UserId == "123" && pu.Email == "test@test.com" && pu.PromotionProgramId == 1))
                    , Times.Once());
            }
        }


        [TestMethod]
        [ExpectedException(typeof(TameenkArgumentNullException),
            "DisenrollUserFromPromotionProgram should not accept empty user id.")]
        public void Test_DisenrollUserFromPromotionProgram_WithEmptyUserId()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser
                    {
                        UserId = "123",
                        PromotionProgramId = 1,
                        Email = "test@test.com"
                    }
                };

                var promotionService = mock.Create<PromotionService>();

                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());

                promotionService.DisenrollUserFromPromotionProgram("");
            }
        }


        [TestMethod]
        [ExpectedException(typeof(TameenkEntityNotFoundException),
         "DisenrollUserFromPromotionProgram should throw exception if entity not found.")]
        public void Test_DisenrollUserFromPromotionProgram_WithFakeUserId()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser
                    {
                        UserId = "123",
                        PromotionProgramId = 1,
                        Email = "test@test.com"
                    }
                };

                var promotionService = mock.Create<PromotionService>();

                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());

                promotionService.DisenrollUserFromPromotionProgram("4444");
            }
        }

        #endregion

        #region IsEmailAlreadyUsed Test Cases

        [TestMethod]
        public void Test_IsEmailAlreadyUsed_EmailUsed()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser
                    {
                        UserId = "123",
                        PromotionProgramId = 1,
                        Email = "test@test.com",
                        EmailVerified = true
                    }
                };

                var promotionService = mock.Create<PromotionService>();

                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());

                var result = promotionService.IsEmailAlreadyUsed("test@test.com");
                Assert.AreEqual(result, true, "This email already used by user.");
            }
        }

        [TestMethod]
        public void Test_IsEmailAlreadyUsed_EmailNotUsed()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser
                    {
                        UserId = "123",
                        PromotionProgramId = 1,
                        Email = "test@test.com",
                        EmailVerified = true
                    }
                };

                var promotionService = mock.Create<PromotionService>();

                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());

                var result = promotionService.IsEmailAlreadyUsed("a@test.com");
                Assert.AreEqual(result, false, "This email is not used by user.");
            }
        }

        [TestMethod]
        [ExpectedException(typeof(TameenkArgumentNullException),
         "IsEmailAlreadyUsed should not accept empty email.")]
        public void Test_IsEmailAlreadyUsed_WitEmptyEmail()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser
                    {
                        UserId = "123",
                        PromotionProgramId = 1,
                        Email = "test@test.com",
                        EmailVerified = true
                    }
                };

                var promotionService = mock.Create<PromotionService>();

                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());

                promotionService.IsEmailAlreadyUsed("");
            }
        }

        #endregion

        #region ValidateBeforeJoinProgram Test Cases

        [TestMethod]
        public void Test_ValidateBeforeJoinProgram_ValidCase()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramDomain> domains = new List<PromotionProgramDomain>
                {
                    new PromotionProgramDomain
                    {
                        PromotionProgramId = 1,
                        Domian = "neom-tech.net"
                    }
                };

                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser
                    {
                        UserId = "123",
                        PromotionProgramId = 1,
                        Email = "test@test.com",
                        EmailVerified = false
                    }
                };

                var promotionService = mock.Create<PromotionService>();

                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());
                mock.Mock<IRepository<PromotionProgramDomain>>().Setup(x => x.Table).Returns(() => domains.AsQueryable());

                var result = promotionService.ValidateBeforeJoinProgram("a@neom-tech.net", 1);
                Assert.AreEqual(result, string.Empty, "User data should be valid.");
            }
        }



        [TestMethod]
        public void Test_ValidateBeforeJoinProgram_UserDomainNotValid()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramDomain> domains = new List<PromotionProgramDomain>
                {
                    new PromotionProgramDomain
                    {
                        PromotionProgramId = 1,
                        Domian = "neom-tech.net"
                    }
                };

                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser
                    {
                        UserId = "123",
                        PromotionProgramId = 1,
                        Email = "test@test.com",
                        EmailVerified = false
                    }
                };

                var promotionService = mock.Create<PromotionService>();

                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());
                mock.Mock<IRepository<PromotionProgramDomain>>().Setup(x => x.Table).Returns(() => domains.AsQueryable());

                var result = promotionService.ValidateBeforeJoinProgram("a@x.net", 1);
                Assert.AreEqual(string.IsNullOrEmpty(result), false, "User domain should be not valid.");
            }
        }

        [TestMethod]
        public void Test_ValidateBeforeJoinProgram_EmailAlreadyUsed()
        {
            using (var mock = AutoMock.GetLoose())
            {
                List<PromotionProgramDomain> domains = new List<PromotionProgramDomain>
                {
                    new PromotionProgramDomain
                    {
                        PromotionProgramId = 1,
                        Domian = "neom-tech.net"
                    }
                };

                List<PromotionProgramUser> users = new List<PromotionProgramUser>
                {
                    new PromotionProgramUser
                    {
                        UserId = "123",
                        PromotionProgramId = 1,
                        Email = "test@neom-tech.net",
                        EmailVerified = true
                    }
                };

                var promotionService = mock.Create<PromotionService>();

                mock.Mock<IRepository<PromotionProgramUser>>().Setup(x => x.Table).Returns(() => users.AsQueryable());
                mock.Mock<IRepository<PromotionProgramDomain>>().Setup(x => x.Table).Returns(() => domains.AsQueryable());

                var result = promotionService.ValidateBeforeJoinProgram("test@neom-tech.net", 1);
                Assert.AreEqual(string.IsNullOrEmpty(result), false, "Email already used.");
            }
        }

        [TestMethod]
        [ExpectedException(typeof(TameenkArgumentNullException),
         "ValidateBeforeJoinProgram should not accept empty email.")]
        public void Test_ValidateBeforeJoinProgram_WithEmptyEmail()
        {
            using (var mock = AutoMock.GetLoose())
            {

                var promotionService = mock.Create<PromotionService>();

                mock.Mock<IRepository<PromotionProgramUser>>();
                mock.Mock<IRepository<PromotionProgramDomain>>();
                promotionService.ValidateBeforeJoinProgram("", 1);
            }
        }

        [TestMethod]
        [ExpectedException(typeof(TameenkArgumentException),
         "ValidateBeforeJoinProgram should not accept program id less than one.")]
        public void Test_ValidateBeforeJoinProgram_WithEmptyProgramId()
        {
            using (var mock = AutoMock.GetLoose())
            {

                var promotionService = mock.Create<PromotionService>();

                mock.Mock<IRepository<PromotionProgramUser>>();
                mock.Mock<IRepository<PromotionProgramDomain>>();
                promotionService.ValidateBeforeJoinProgram("test@neom-tech.net", 0);
            }
        }

        #endregion
    }
}
