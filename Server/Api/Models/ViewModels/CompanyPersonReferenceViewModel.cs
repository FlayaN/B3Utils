using System;

namespace Api.Models.ViewModels
{
    public class CompanyPersonReferenceViewModel
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Position { get; set; }
        public int Relation { get; set; }
        public string Description { get; set; }
        public Guid CompanyId { get; set; }
        public string UserId { get; set; }
    }
}