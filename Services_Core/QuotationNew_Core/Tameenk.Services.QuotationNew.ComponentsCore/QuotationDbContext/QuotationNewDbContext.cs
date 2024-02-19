
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;

using System.Data;
using Tameenk.Core.Domain.Entities;
using Tameenk.Core.Domain.Entities.PromotionPrograms;
using Tameenk.Core.Domain.Entities.VehicleInsurance;

namespace Tameenk.Services.QuotationNew.Components.QuotationDbContext
{
    public class QuotationNewDbContext : DbContext
    {

        public QuotationNewDbContext(DbContextOptions<QuotationNewDbContext> options) : base(options)
        {
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            // optionsBuilder.UseSqlServer("your_connection_string_here");
        }

        public QuotationNewRequestDetails GetFromCheckoutByReferenceId(string externalId)
        {
            QuotationNewRequestDetails request = new QuotationNewRequestDetails();
            using (var connection = Database.GetDbConnection() as SqlConnection)
            {
                if (connection == null)
                    throw new InvalidOperationException("The connection is not a valid SQL connection.");

                if (connection.State != System.Data.ConnectionState.Open)
                    connection.Open();

                using (var command = connection.CreateCommand())
                {
                    try
                    {
                        command.CommandText = "GetQuotationRequestDetailsByExternalId";
                        command.CommandType = CommandType.StoredProcedure;
                        
                        SqlParameter nationalIDParameter = new SqlParameter() { ParameterName = "externalId", Value = externalId };
                        command.Parameters.Add(nationalIDParameter);
                        
                        var reader = command.ExecuteReader();
                        request.AdditionalDrivers = new List<Driver>();
                        request.MainDriverViolation = new List<DriverViolation>();
                        request.MainDriverLicenses = new List<DriverLicense>();

                        request = ObjectMapper<QuotationNewRequestDetails>.MapReaderToObjectList(reader);

                        if (reader.NextResult())
                        {
                            while (reader.Read())
                            {
                                request.AdditionalDrivers.Add(ObjectMapper<Driver>.MapReaderToObjectList(reader));
                            }
                        }

                        if (reader.NextResult())
                        {
                            while (reader.Read())
                            {
                                request.MainDriverViolation.Add(ObjectMapper<DriverViolation>.MapReaderToObjectList(reader));
                            }
                        }

                        if (reader.NextResult())
                        {
                            while (reader.Read())
                            {
                                request.MainDriverLicenses.Add(ObjectMapper<DriverLicense>.MapReaderToObjectList(reader));
                            }
                        }
                        connection.Close();
                    }
                    catch (Exception ex)
                    {
                        connection.Close();
                    }
                }
            }
            return request;
        }

        private Address GetAddressesByNin(string driverNin)
        {
            Address address = null;
            using (var connection = Database.GetDbConnection() as SqlConnection)
            {
                if (connection == null)
                    throw new InvalidOperationException("The connection is not a valid SQL connection.");

                if (connection.State != System.Data.ConnectionState.Open)
                    connection.Open();

                using var command = connection.CreateCommand();
                try
                {
                    command.CommandText = "GetAddress";
                    command.CommandType = CommandType.StoredProcedure;
                    SqlParameter nationalIDParameter = new SqlParameter() { ParameterName = "@driverNin", Value = driverNin };
                    command.Parameters.Add(nationalIDParameter);
                    var reader = command.ExecuteReader();

                    address = ObjectMapper<Address>.MapReaderToObjectList(reader);

                    connection.Close();
                }
                catch (Exception ex)
                {
                    connection.Close();
                }
            }
            return address;
        }

        public PromotionProgramUserModel GetUserPromotionCodeInfo(string userId, string nationalId, int insuranceCompanyId, int insuranceTypeCode)
        {

            PromotionProgramUserModel promotionProgramUserModel = null;
            using (var connection = Database.GetDbConnection() as SqlConnection)
            {
                if (connection == null)
                    throw new InvalidOperationException("The connection is not a valid SQL connection.");

                if (connection.State != System.Data.ConnectionState.Open)
                    connection.Open();

                using var command = connection.CreateCommand();
                try
                {
                    command.CommandText = "GetUserPromotionProgramInfo";
                    command.CommandType = CommandType.StoredProcedure;
                    if (!string.IsNullOrEmpty(userId) && userId != Guid.Empty.ToString())
                    {
                        SqlParameter userIdParam = new SqlParameter() { ParameterName = "userId", Value = userId };
                        command.Parameters.Add(userIdParam);
                    }
                    SqlParameter nationalIdParam = new SqlParameter() { ParameterName = "nationalId", Value = nationalId };
                    command.Parameters.Add(nationalIdParam);

                    SqlParameter insuranceCompanyIdParam = new SqlParameter() { ParameterName = "insuranceCompanyId", Value = insuranceCompanyId };
                    SqlParameter insuranceTypeCodeParam = new SqlParameter() { ParameterName = "insuranceTypeCode", Value = insuranceTypeCode };

                    command.Parameters.Add(insuranceCompanyIdParam);
                    command.Parameters.Add(insuranceTypeCodeParam);
                    var reader = command.ExecuteReader();


                    promotionProgramUserModel = ObjectMapper<PromotionProgramUserModel>.MapReaderToObjectList(reader);

                    connection.Close();
                }
                catch (Exception ex)
                {
                    connection.Close();
                    return null;
                }
            }
            return promotionProgramUserModel;
        }
    }
}