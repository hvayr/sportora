using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace SportoraAPI.Utils
{
    static class DBConnectionHelper
    {
        private const string dbstringPath = "dbstring.conf";


        /// <summary>
        /// Returns the connection string from file at ´dbstringPath´ path if it's readable
        /// Otherwise throws exception
        /// </summary>
        public static string GetConnectionString()
        {
            try
            {
                string connectionString = File.ReadAllText(dbstringPath);
                return connectionString;
            }
            catch (Exception e)
            {
                throw new Exception($"Unable to read {dbstringPath} file. Make sure it exists and the copy to output directory is set to 'copy if newer'", e);
            }
        }
    }
}
