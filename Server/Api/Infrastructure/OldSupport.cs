using Api.Models.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Infrastructure
{
    public static class OldSupport
    {
        [Obsolete]
        public static FitnessType PatchOld(string type)
        {
            return type == "getDailyDistanceSamples" ? FitnessType.Distance : FitnessType.Steps;
        }

        [Obsolete]
        public static string PatchOld(FitnessType type)
        {
            return type == FitnessType.Distance ? "getDailyDistanceSamples" : "getDailyStepCountSamples";
        }
    }
}
