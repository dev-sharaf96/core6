﻿//using Tameenk.Core.Domain;

//namespace Tameenk.Data.Mapping.Payments.HyperPay
//{
//    public class HyperPayNotificationMap :IEntityTypeConfiguration<HyperPayNotification>
//    {
//        public HyperPayNotificationMap()
//        {
//            ToTable("HyperPayNotifications");
//            HasKey(e => e.Id);
//            HasMany(e => e.Transactions)
//                .WithRequired(e => e.Notification)
//                .HasForeignKey(e => e.NotificationId)
//                .WillCascadeOnDelete(false);
//        }
//    }
//}
