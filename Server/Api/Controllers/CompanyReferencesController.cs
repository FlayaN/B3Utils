using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Api.Models.ViewModels;
using Api.Models.Database;
using System.Linq;
using System;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace Api.Controllers
{
    [Route("api/v1/[controller]")]
    public class CompanyReferencesController : Controller
    {
        private AppDbContext _context;

        public CompanyReferencesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetCompanyReferences()
        {
            return new OkObjectResult(_context.CompanyReferences.Select(Mapper.Map<CompanyReferenceViewModel>).ToList());
        }

        [HttpGet("{companyId}/Persons")]
        public IActionResult GetCompanyReferencePersons(Guid companyId)
        {
            var companyReference = _context.CompanyReferences
                .Include(x => x.Persons)
                .FirstOrDefault(x => x.Id == companyId);
            if (companyReference != null)
            {
                return new OkObjectResult(companyReference.Persons.Select(Mapper.Map<CompanyPersonReferenceViewModel>).ToList());
            }
            return NotFound("Company reference not found");
        }

        [HttpPost]
        public IActionResult PostCompany([FromBody]CompanyReferenceViewModel model)
        {
            _context.CompanyReferences.Add(new CompanyReference
            {
                City = model.City,
                Name = model.Name,
                Description = model.Description
            });
            _context.SaveChanges();
            return Ok();
        }

        [HttpPost("Persons")]
        public IActionResult PostPerson([FromBody]CompanyPersonReferenceViewModel model)
        {
            var company = _context.CompanyReferences.FirstOrDefault(x => x.Id == model.CompanyId);
            if (company != null)
            {
                if (company.Persons == null)
                {
                    company.Persons = new List<CompanyPersonReference>();
                }
                company.Persons.Add(new CompanyPersonReference
                {
                    Name = model.Name,
                    Position = model.Position,
                    Relation = model.Relation,
                    Description = model.Description,
                    CompanyId = model.CompanyId,
                    UserPersonMaps = new List<UserPersonMap>
                    {
                        new UserPersonMap
                        {
                            UserId = model.UserId
                        }
                    }
                });
                _context.SaveChanges();
                return Ok();
            }
            return NotFound();
        }
    }
}
