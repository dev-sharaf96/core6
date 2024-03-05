//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Text;
//using System.Threading.Tasks;

//namespace TameenkDALCore
//{
//    internal class extenation
//    {
//    }
//}
using System.Data.Common;

public static class TranslateResultSet
{
    public static List<T> LoadListFromDbReader<T>(this DbDataReader reader)
    {
        List<T> resultSetValues = (List<T>)Activator.CreateInstance(typeof(List<>).MakeGenericType(typeof(T)));
        List<String> columns = Enumerable.Range(0, reader.FieldCount).Select(reader.GetName).ToList();
        while (reader.Read())
        {
            var obj = Activator.CreateInstance(typeof(T));
            if (obj == null)
            {
                throw new Exception(@"Cannot create object from type '" + typeof(T).Name + "'");
            }
            foreach (String column in columns)
            {
                var value = reader[column] == DBNull.Value ? null : reader[column];
                obj!.GetType().GetProperty(column)?.SetValue(obj, value);
            }
            resultSetValues!.Add((T)obj);
        }
        return resultSetValues;
    }
}
