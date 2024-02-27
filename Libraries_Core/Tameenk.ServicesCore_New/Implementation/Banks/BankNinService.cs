using System;
using System.Collections.Generic;
using System.Linq;
using Tameenk.Core.Data;
using Tameenk.Core.Domain.Entities;
using Tameenk.Core.Exceptions;
using Tameenk.Services.Core;

namespace Tameenk.Services.Implementation
{
    public class BankNinService : IBankNinService
    {

        private readonly IRepository<BankNins> _bankNinRepository;


        public BankNinService(IRepository<BankNins> bankNinRepository)
        {
            _bankNinRepository = bankNinRepository ?? throw new TameenkArgumentNullException(nameof(bankNinRepository));
        }

        public List<string> GetBankNin(int? Bankid)
        {
            return _bankNinRepository.Table.Where(x => x.BankId == Bankid).Select(x => x.NIN).ToList();
        }

        public bool IsBankNinExist(int Bankid, string Nin)
        {
            return _bankNinRepository.Table.Any(x => x.BankId == Bankid && x.NIN == Nin);
        }

        public bool AddBankNin(int Bankid, List<string> Nin)
        {
            try
            {
                List<BankNins> bankNins = new List<BankNins>();

                foreach (var id in Nin)
                {
                    BankNins bank = new BankNins() { BankId = Bankid, NIN = id };
                    bankNins.Add(bank);

                }
                _bankNinRepository.InsertAsync(bankNins);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public bool DeleteBankNin(int Bankid, List<string> bankNins)
        {
            try
            {
                List<BankNins> Nins = new List<BankNins>();
                foreach (var nin in bankNins)
                {
                    var bankNin = _bankNinRepository.Table.Where(x => x.NIN == nin && x.BankId == Bankid).FirstOrDefault();
                    Nins.Add(bankNin);

                }
                _bankNinRepository.DeleteAsync(Nins);
                return true;
            }
            catch (Exception)
            {

                return false;
            }
        }
    }
}
