using System;
namespace Tameenk.CircuitBreaker
{
    public static class TaskCanceledHandler
    {
        public static bool CheckCanceldStatus(Exception exception)
        {
            if (exception.GetType()?.Name == "TaskCanceledException")
                return true;
            return false;
        }
    }
}
