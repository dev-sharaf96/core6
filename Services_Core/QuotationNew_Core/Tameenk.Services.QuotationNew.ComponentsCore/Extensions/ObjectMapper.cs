using Microsoft.Data.SqlClient;
using System;
using System.Linq;
using System.Reflection;

namespace Tameenk.Services.QuotationNew.Components
{
    public static class ObjectMapper<T> where T : class, new()
        {
            public static T MapReaderToObjectList(SqlDataReader reader, string nestedComplextPropertyName = "", Type complextObject = null, bool containComplexNestedProperty = false)
            {
            try
            {
                var columns = Enumerable.Range(0, reader.FieldCount).Select(reader.GetName).ToList();
                var item = new T();
                Type t = item.GetType();
                var probs = t.GetProperties();
                foreach (PropertyInfo property in probs)
                {
                    Type type = property.PropertyType;
                    string readerValue = string.Empty;
                    if (columns.Contains(property.Name))
                    {
                        if (reader[property.Name] != DBNull.Value)
                        {
                            readerValue = reader[property.Name].ToString();
                        }
                        if (!string.IsNullOrEmpty(readerValue))
                        {
                            if (type == typeof(string))
                            {
                                property.SetValue(item, readerValue, null);
                            }
                            else if (type == typeof(Int64) || type == typeof(Int64?))
                            {
                                property.SetValue(item, Convert.ToInt64(readerValue), null);
                            }
                            else if (type == typeof(int))
                            {
                                property.SetValue(item, Convert.ToInt32(readerValue), null);
                            }
                            else if (type == typeof(long) || type == typeof(long?))
                            {
                                property.SetValue(item, Convert.ToInt64(readerValue), null);
                            }
                            else if (type == typeof(DateTime) || type == typeof(DateTime?))
                            {
                                property.SetValue(item, Convert.ToDateTime(reader[property.Name]), null);
                            }
                            else if (type == typeof(float) || type == typeof(float?))
                            {
                                float floatVar = 0;
                                float.TryParse(readerValue, out floatVar);
                                property.SetValue(item, floatVar, null);
                            }
                            else if (type == typeof(bool) || type == typeof(bool?))
                            {
                                property.SetValue(item, Convert.ToBoolean(readerValue), null);
                            }
                            else if (type == typeof(int?) || type == typeof(int))
                            {
                                property.SetValue(item, Convert.ToInt32(readerValue), null);
                            }
                            else if (type == typeof(Decimal?) || type == typeof(Decimal))
                            {
                                property.SetValue(item, Convert.ToDecimal(readerValue), null);
                            }
                            else if (type == typeof(double) || type == typeof(double?))
                            {
                                property.SetValue(item, Convert.ToDouble(readerValue), null);
                            }   
                            else if (type == typeof(short) || type == typeof(short?))
                            {
                                property.SetValue(item, short.Parse(readerValue), null);
                            }   
                            else if (type == typeof(byte) || type == typeof(byte?))
                            {
                                property.SetValue(item, byte.Parse(readerValue), null);
                            }
                            else if (type == typeof(Guid) || type == typeof(Guid?))
                            {
                                var val = Guid.Empty;
                                Guid.TryParse(readerValue, out val);
                                property.SetValue(item, val, null);
                            }
                        }

                    }
                    if (containComplexNestedProperty && property.Name == nestedComplextPropertyName)
                    {
                        var complexItemProperties = complextObject.GetProperties();
                        var complexNestedObject = Activator.CreateInstance(complextObject);
                        foreach (PropertyInfo prob in complexItemProperties)
                        {
                            readerValue = string.Empty;

                            if (columns.Contains(prob.Name))
                            {
                                if (reader[prob.Name] != DBNull.Value)
                                {
                                    readerValue = reader[prob.Name].ToString();
                                }


                                if (!string.IsNullOrEmpty(readerValue))
                                {
                                    if (prob.PropertyType == typeof(string))
                                    {

                                        prob.SetValue(complexNestedObject, readerValue, null);
                                    }
                                    else if (prob.PropertyType == typeof(Int64) || prob.PropertyType == typeof(Int64?))
                                    {
                                        prob.SetValue(complexNestedObject, Convert.ToInt64(readerValue), null);
                                    }
                                    else if (prob.PropertyType == typeof(int))
                                    {
                                        prob.SetValue(complexNestedObject, Convert.ToInt32(readerValue), null);
                                    }
                                    else if (prob.PropertyType == typeof(long) || prob.PropertyType == typeof(long?))
                                    {
                                        prob.SetValue(complexNestedObject, Convert.ToInt64(readerValue), null);
                                    }
                                    else if (prob.PropertyType == typeof(DateTime) || prob.PropertyType == typeof(DateTime?))
                                    {
                                        prob.SetValue(complexNestedObject, Convert.ToDateTime(reader[prob.Name]), null);
                                    }
                                    else if (prob.PropertyType == typeof(float) || prob.PropertyType == typeof(float?))
                                    {
                                        float floatVar = 0;
                                        float.TryParse(readerValue, out floatVar);
                                        prob.SetValue(complexNestedObject, floatVar, null);
                                    }
                                    else if (prob.PropertyType == typeof(bool) || prob.PropertyType == typeof(bool?))
                                    {
                                        prob.SetValue(complexNestedObject, Convert.ToBoolean(readerValue), null);
                                    }
                                    else if (prob.PropertyType == typeof(int?) || prob.PropertyType == typeof(int))
                                    {
                                        prob.SetValue(complexNestedObject, Convert.ToInt32(readerValue), null);
                                    }
                                    else if (type == typeof(Decimal?) || prob.PropertyType == typeof(Decimal))
                                    {
                                        prob.SetValue(complexNestedObject, Convert.ToDecimal(readerValue), null);
                                    }
                                    else if (type == typeof(double) || prob.PropertyType == typeof(double?))
                                    {
                                        prob.SetValue(item, Convert.ToDouble(readerValue), null);
                                    }
                                }

                            }

                        }
                        property.SetValue(item, complexNestedObject);
                    }
                }
                return item;
            }
            catch (Exception ex)
            {
                var y = ex;
                throw;
            }
      
            }
        }
    }

