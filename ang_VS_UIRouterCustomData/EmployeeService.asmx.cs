using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Configuration;
using System.Data.SqlClient;
using System.Web.Script.Serialization;

namespace UIRouterCustomData
{
    /// <summary>
    /// Summary description for EmployeeService
    /// </summary>
    [WebService(Namespace = "http://tempuri.org/")]
    [WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
    [System.ComponentModel.ToolboxItem(false)]
    // To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
    [System.Web.Script.Services.ScriptService]
    public class EmployeeService : System.Web.Services.WebService
    {

        [WebMethod]
        public void GetAllEmployees()
        {
            List<Employee> listEmployees = new List<Employee>();
            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("select * from dbo.Test1;", con);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    Employee employee = new Employee();
                    employee.id = Convert.ToInt32(rdr["id"]);
                    employee.name = rdr["name"].ToString();
                    employee.gender = rdr["gender"].ToString();
                    employee.salary = Convert.ToInt32(rdr["salary"]);
                    listEmployees.Add(employee);
                }
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(listEmployees));
        }

        [WebMethod]
        public void GetEmployee(int id)
        {
            Employee employee = new Employee();

            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("select * from dbo.Test1 where id = @id;", con);
                SqlParameter param = new SqlParameter()
                {
                    ParameterName = "@id",
                    Value = id
                };

                cmd.Parameters.Add(param);

                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    employee.id = Convert.ToInt32(rdr["id"]);
                    employee.name = rdr["name"].ToString();
                    employee.gender = rdr["gender"].ToString();
                    employee.salary = Convert.ToInt32(rdr["salary"]);
                }
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(employee));
        }

        [WebMethod]
        public void GetEmployeeByName(string name)
        {
            List<Employee> listEmployees = new List<Employee>();

            string cs = ConfigurationManager.ConnectionStrings["DBCS"].ConnectionString;
            using (SqlConnection con = new SqlConnection(cs))
            {
                SqlCommand cmd = new SqlCommand("select * from dbo.Test1 where name like @name;", con);
                SqlParameter param = new SqlParameter()
                {
                    ParameterName = "@name",
                    Value = name + "%"
                };

                cmd.Parameters.Add(param);
                con.Open();
                SqlDataReader rdr = cmd.ExecuteReader();

                while (rdr.Read())
                {
                    Employee employee = new Employee();
                    employee.id = Convert.ToInt32(rdr["id"]);
                    employee.name = rdr["name"].ToString();
                    employee.gender = rdr["gender"].ToString();
                    employee.salary = Convert.ToInt32(rdr["salary"]);
                    listEmployees.Add(employee);
                }
            }
            JavaScriptSerializer js = new JavaScriptSerializer();
            Context.Response.Write(js.Serialize(listEmployees));
        }
    }
}
