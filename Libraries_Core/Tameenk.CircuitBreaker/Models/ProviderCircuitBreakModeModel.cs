using System;

namespace Tameenk.CircuitBreaker
{
    public class ProviderCircuitBreakModeModel
    {
        public bool IsBreaked { get; set; }
        public int NoOfCancellationExceptionsHappened { get; set; }
        public DateTime BreakTime { get; set; }
        public DateTime NextTryTime { get; set; }
        public string ProviderName { get; set; }
    }
}
