using System;
using System.Collections.Generic;
//using System.Data.Entity.Validation;
using Tameenk.Loggin.DAL.Entities;

namespace Tameenk.Loggin.DAL
{
    public class OffersDataAccess
    {
        public static bool AddOffer(Offer offer)
        {
            using (TameenkLog context = new TameenkLog())
            {
                offer.CreatedDate = DateTime.Now;
                offer.LastModifiedDate = DateTime.Now;
                //context.Offers.Add(offer);
                context.SaveChanges();
                return true;
            }
        }

        public static List<Offer> Offers()
        {
            using (TameenkLog context = new TameenkLog())
            {
                // return  context.Offers.ToList();
                return null;
            }
        }

        public static List<Offer> Offers(bool isActive)
        {
            using (TameenkLog context = new TameenkLog())
            {
                //return context.Offers.Where(x=>x.IsActive == isActive).ToList();
                return null;
            }
        }

    }
}
