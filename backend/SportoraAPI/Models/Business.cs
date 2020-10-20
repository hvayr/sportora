using System;
using System.Collections.Generic;

namespace SportoraAPI.Models
{
    public class Business
    {
        public  String        Name        { get; set; }
        public  int           Id          { get; set; }
        public  String        PhoneNumber { get; set; }
        public  int[]         GroupIds    { get; set; }
        public  String        Location    { get; set; }
        public  List<decimal> Prices      { get; set; }
        public  String[]      Premises    { get; set; }
        private String        Password    { get; set; }
    }
}