//using System.ComponentModel.DataAnnotations.Schema;
//using Tameenk.Core.Domain.Entities.Policies;

//namespace Tameenk.Data.Mapping.Policies
//{
//    public class PolicyUpdateRequestAttachmentMap :IEntityTypeConfiguration<PolicyUpdateRequestAttachment>
//    {
//        public PolicyUpdateRequestAttachmentMap()
//        {
//            ToTable("PolicyUpdateRequestAttachment");
//            HasKey(e => e.Id);
//            Property(e => e.Id).HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);
//            Property(e => e.PolicyUpdReqId).IsRequired();
//            Property(e => e.AttachmentId).IsRequired();
//            HasRequired(e => e.Attachment).WithMany(e=>e.PolicyUpdateRequestAttachments).HasForeignKey(e=>e.AttachmentId);
//            HasRequired(e => e.PolicyUpdateRequest).WithMany(e=>e.PolicyUpdateRequestAttachments).HasForeignKey(e=>e.PolicyUpdReqId);
//        }
//    }
//}
