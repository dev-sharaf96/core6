//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace TameenkDALCore
//{
//    internal class Exception_cs
//    {
//    }
//}

using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data.Common;
using Tameenk.Core.Domain;
using Tameenk.Core.Domain.Entities.VehicleInsurance;

public class QueryStoredProcedureWithMultipleResults
{
    public QuotationRequestInfoModel quotationRequestInfoModel { get; set; } = new QuotationRequestInfoModel();


    public QueryStoredProcedureWithMultipleResults(DbContext dbContext,string externalId)
    {
        //GetQuotationRequestDetailsByExternalId @ExternalId"
        DbCommand cmd = null;
        DbDataReader reader = null;
        try
        {
            cmd = dbContext.Database.GetDbConnection().CreateCommand();
            if (cmd.Connection.State != System.Data.ConnectionState.Open)
            {
                cmd.Connection.Open();
            }
            cmd.CommandText = @"GetQuotationRequestDetailsByExternalId";
            cmd.CommandType = System.Data.CommandType.StoredProcedure;
            cmd.Parameters.Add(new SqlParameter("@ExternalId", externalId));
            reader = cmd.ExecuteReader();

            // first, load a list of count values from various tables in the database (Query_Result0 is the same as
            // Query_Result1, except every property is nullable, and the .Val() extension methods return a non-null
            // value for every data type after checking to see if it is null or not).

            foreach (var result in TranslateResultSet.LoadListFromDbReader<QuotationRequestInfoModel>(reader))
            {
                quotationRequestInfoModel = result;                // etc.
                break;
            }
            reader.NextResult();
            quotationRequestInfoModel.AdditionalDrivers = new List<Driver>();
            foreach (var result in TranslateResultSet.LoadListFromDbReader<Driver>(reader))
            {
                quotationRequestInfoModel.AdditionalDrivers.Add(result);
            }
            reader.NextResult();
            quotationRequestInfoModel.MainDriverViolation = new List<DriverViolation>();
            foreach (var result in TranslateResultSet.LoadListFromDbReader<DriverViolation>(reader))
            {
                quotationRequestInfoModel.MainDriverViolation.Add(result);
            }
            reader.NextResult();
            quotationRequestInfoModel.MainDriverLicenses = new List<DriverLicense>();
            foreach (var result in TranslateResultSet.LoadListFromDbReader<DriverLicense> (reader))
            {
                quotationRequestInfoModel.MainDriverLicenses.Add(result);
            }
        }
        catch (Exception ex)
        {
            throw new Exception("Abend in QueryStoredProcedureWithMultipleResults", ex);
        }
        finally
        {
            reader.DisposeAsync();
            cmd.Connection.Close();
            cmd.DisposeAsync();
        }
    }
}

