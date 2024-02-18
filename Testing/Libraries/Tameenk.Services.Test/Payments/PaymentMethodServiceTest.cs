using Autofac.Extras.Moq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using System.Collections.Generic;
using System.Linq;
using Tameenk.Core.Data;
using Tameenk.Core.Domain.Entities.Payments;
using Tameenk.Services.Implementation.Payments;

namespace Tameenk.Services.Test.Payments
{
    [TestClass]
    public class PaymentMethodServiceTest
    {

        [TestMethod]
        public void Test_GetPaymentMethods_GetAll()
        {
            using (var mock = AutoMock.GetLoose())
            {
                var paymentMethods = new List<PaymentMethod>();
                paymentMethods.Add(new PaymentMethod() { Id=1, Active = true, Code= 1, Name = "Payfort", Order = 1 });
                paymentMethods.Add(new PaymentMethod() { Id=2, Active = true, Code= 1, Name = "Sadad", Order = 2 });
                paymentMethods.Add(new PaymentMethod() { Id=3, Active = true, Code= 1, Name = "RiyadBank", Order = 3 });

                mock.Mock<IRepository<PaymentMethod>>().Setup(x => x.Table).Returns(() => paymentMethods.AsQueryable());
                var paymentMethodService = mock.Create<PaymentMethodService>();
                var result = paymentMethodService.GetPaymentMethods();
                Assert.IsInstanceOfType(result, typeof(List<PaymentMethod>));
                Assert.AreEqual(3, result.Count);
            }
        }

        [TestMethod]
        public void Test_GetPaymentMethods_GetActiveOnly()
        {
            using (var mock = AutoMock.GetLoose())
            {
                var paymentMethods = new List<PaymentMethod>();
                paymentMethods.Add(new PaymentMethod() { Id = 1, Active = true, Code = 1, Name = "Payfort", Order = 1 });
                paymentMethods.Add(new PaymentMethod() { Id = 2, Active = false, Code = 1, Name = "Sadad", Order = 2 });
                paymentMethods.Add(new PaymentMethod() { Id = 3, Active = true, Code = 1, Name = "RiyadBank", Order = 3 });

                mock.Mock<IRepository<PaymentMethod>>().Setup(x => x.Table).Returns(() => paymentMethods.AsQueryable());
                var paymentMethodService = mock.Create<PaymentMethodService>();
                var result = paymentMethodService.GetPaymentMethods();
                Assert.IsInstanceOfType(result, typeof(List<PaymentMethod>));
                Assert.AreEqual(2, result.Count);
            }
        }

        [TestMethod]
        public void Test_GetPaymentMethods_GetActiveAndDeactive()
        {
            using (var mock = AutoMock.GetLoose())
            {
                var paymentMethods = new List<PaymentMethod>();
                paymentMethods.Add(new PaymentMethod() { Id = 1, Active = true, Code = 1, Name = "Payfort", Order = 1 });
                paymentMethods.Add(new PaymentMethod() { Id = 2, Active = false, Code = 1, Name = "Sadad", Order = 2 });
                paymentMethods.Add(new PaymentMethod() { Id = 3, Active = true, Code = 1, Name = "RiyadBank", Order = 3 });

                mock.Mock<IRepository<PaymentMethod>>().Setup(x => x.Table).Returns(() => paymentMethods.AsQueryable());
                var paymentMethodService = mock.Create<PaymentMethodService>();
                var result = paymentMethodService.GetPaymentMethods(false);
                Assert.IsInstanceOfType(result, typeof(List<PaymentMethod>));
                Assert.AreEqual(3, result.Count);
            }
        }


        [TestMethod]
        public void Test_GetPaymentMethods_GetActiveWithOrder()
        {
            using (var mock = AutoMock.GetLoose())
            {
                var paymentMethods = new List<PaymentMethod>();
                paymentMethods.Add(new PaymentMethod() { Id = 2, Active = true, Code = 1, Name = "Sadad", Order = 2 });
                paymentMethods.Add(new PaymentMethod() { Id = 3, Active = true, Code = 1, Name = "RiyadBank", Order = 3 });
                paymentMethods.Add(new PaymentMethod() { Id = 1, Active = true, Code = 1, Name = "Payfort", Order = 1 });

                mock.Mock<IRepository<PaymentMethod>>().Setup(x => x.Table).Returns(() => paymentMethods.AsQueryable());
                var paymentMethodService = mock.Create<PaymentMethodService>();
                var result = paymentMethodService.GetPaymentMethods(false);
                Assert.IsInstanceOfType(result, typeof(List<PaymentMethod>));
                Assert.AreEqual(3, result.Count);
                Assert.AreEqual(1, result.FirstOrDefault().Id);
                Assert.AreEqual(3, result.LastOrDefault().Id);
            }
        }
    }
}
