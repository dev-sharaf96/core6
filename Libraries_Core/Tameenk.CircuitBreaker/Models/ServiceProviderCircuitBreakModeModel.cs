using System;

namespace Tameenk.CircuitBreaker
{
    public class ServiceProviderCircuitBreakModeModel
    {
        public bool IsBreaked { get; set; }
        public int NoOfExceptionsHappened { get; set; }
        public DateTime BreakTime { get; set; }
        public DateTime NextTryTime { get; set; }
        public string ServiceProviderName { get; set; }
    }
}
