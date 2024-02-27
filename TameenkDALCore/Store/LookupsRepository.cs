using System;
using System.Linq;
using Tameenk.Core.Domain.Entities;
using Tameenk.Core.Domain.Entities.Payments;
using Tameenk.Core.Domain.Entities.VehicleInsurance;
using Tameenk.Core.Infrastructure;
using Tameenk.Data;

namespace TameenkDAL.Store
{
    public class LookupsRepository
    {
        private readonly YourDbContext context;
        public LookupsRepository(YourDbContext dbContext)
        {
            context = dbContext;
        }
        #region Declarations
        //TameenkDbContext context = new TameenkDbContext();
        
        #endregion
        #region Languages
        public IQueryable<Language> GetAlLanguages()
        {
           

            return context.Set<Language>();
        }
        #endregion
        #region ProductTypes
        public IQueryable<ProductType> GetAllProductTypes()
        {
            return context.Set<ProductType>();
        }
        #endregion
        #region Benifits
        public IQueryable<Benefit> GetAllBenefits()
        {
            return context.Set<Benefit>();
        }
        public IQueryable<Benefit> GetAllBenefit(short BenifitCode)
        {
            return context.Set<Benefit>().Where(b => b.Code == BenifitCode);
        }
        #endregion
        #region VehicleID Types
        public IQueryable<VehicleIDType> GetallVehicleIdTypes()
        {
            return context.Set<VehicleIDType>();
        }
        #endregion
        #region Driver Types
        public IQueryable<DriverType> GetAllDriverTypes()
        {
            return context.Set<DriverType>();
        }
        #endregion
        #region Price Types
        public IQueryable<PriceType> GetAPriceTypes()
        {
            return context.Set<PriceType>();
        }
        #endregion
        #region PaymentMethods
        public IQueryable<PaymentMethod> GetAllPaymentMethods()
        {
            return context.Set<PaymentMethod>();
        }

        public IQueryable<PaymentMethod> GetImplementedPaymentMehods()
        {
            return context.Set<PaymentMethod>().Where(p => p.Active);
        }
        #endregion
        #region NCD Free Years
        public IQueryable<NCDFreeYear> GetAllNcdFreeYears()
        {
            return context.Set<NCDFreeYear>();
        }
        #endregion
        #region Vehicle Colors
        public IQueryable<VehicleColor> GetAVehicleColors()
        {
            return context.Set<VehicleColor>();
        }
        #endregion
        #region BankCodes
        public IQueryable<BankCode> GetAllBankCodes()
        {
            return context.Set<BankCode>();
        }
        #endregion
        #region ErrorCodes
        public IQueryable<ErrorCode> GetAllErrorCodes()
        {
            return context.Set<ErrorCode>();
        }
        #endregion
        #region LicenseType
        public IQueryable<LicenseType> GetAlLicenseTypes()
        {
            return context.Set<LicenseType>();
        }
        #endregion
        #region Cities
        public IQueryable<City> GetAllCities()
        {
           
            return context.Set<City>();
        }
        #endregion
        #region Nationalities/Countries
        public IQueryable<Country> GetAllCountries()
        {
            return context.Set<Country>();
        }
        #endregion
        #region VehiclePlate Types
        public IQueryable<VehiclePlateType> GetAllPlateTypes()
        {
            return context.Set<VehiclePlateType>();
        }
        #endregion
        #region Vehicle Body Types
        public IQueryable<VehicleBodyType> GetAllVehicleBodyTypes()
        {
            return context.Set<VehicleBodyType>();
        }
        #endregion
        #region Vehicle Plate Text
        public IQueryable<VehiclePlateText> GeAllVehiclePlateTexts()
        {
            return context.Set<VehiclePlateText>();
        }
        #endregion
        #region Vehicle Makers
        public IQueryable<VehicleMaker> GetAkkVehicleMakers()
        {
            return context.Set<VehicleMaker>();
        }
        #endregion
        #region Vehicle Model
        public IQueryable<VehicleModel> GetAllVehicleModels(short MakerID)
        {
            return context.Set<VehicleModel>().Where(m => m.VehicleMakerCode == MakerID);
        }
        #endregion
        #region User Role Types
        public IQueryable<RoleType> GetAllRoleTypes()
        {
            return context.Set<RoleType>();
        }
        #endregion
        #region User Roles
        public IQueryable<Role> GetAllRoles()
        {
            return context.Set<Role>();
        }
        public IQueryable<Role> GetAllRolesByType(Guid TypeID)
        {
            return context.Set<Role>().Where(r => r.RoleTypeID == TypeID);
        }
        #endregion

        #region Breaking Systems

        public IQueryable<BreakingSystem> GetAllBreakingsystems()
        {
            return context.Set<BreakingSystem>();
        }
        #endregion
        #region Speed Stabilizer
        public IQueryable<SpeedStabilizer> GetAllSpeedStabilizers()
        {
            return context.Set<SpeedStabilizer>();
        }
        #endregion
        #region Sensors
        public IQueryable<Sensor> GetllSensors()
        {
            return context.Set<Sensor>();
        }
        #endregion
        #region Distance Ranges
        public IQueryable<DistanceRange> GetAllDistanceRanges()
        {
            return context.Set<DistanceRange>();
        }
        #endregion
        #region Camera Types
        public IQueryable<CameraType> GetAllCameras()
        {
            return context.Set<CameraType>();
        }
        #endregion
        #region Parking Places
        public IQueryable<ParkingPlace> GetAllParkingPlaces()
        {
            return context.Set<ParkingPlace>();
        }
        #endregion
        #region Driving Licence Years
        public IQueryable<DrivingLicenceYear> GetAllDrivingLicenceYears()
        {
            return context.Set<DrivingLicenceYear>();
        }
        #endregion
        #region Driver Medical Conditions
        public IQueryable<DriverMedicalCondition> GetAllDriverMedicalConditions()
        {
            return context.Set<DriverMedicalCondition>();
        }
        #endregion
        #region Vehicle Usage Percentage
        public IQueryable<VehicleUsagePercentage> GetAllVehicleUsagePercentages()
        {
            return context.Set<VehicleUsagePercentage>();
        }
        #endregion
        #region Vehicle Transmission Types
        public IQueryable<VehicleTransmissionType> GetAllTransmissionTypes()
        {
            return context.Set<VehicleTransmissionType>();
        }
        #endregion

    }
}
