namespace PBSK.Shared.Models;

public class MatchHistoryEntry
{
    public string ServingPlayer { get; set; } = string.Empty;
    public string ServingTeam { get; set; } = string.Empty;
    public int ServerNumber { get; set; }
    public int SouthScore { get; set; }
    public int NorthScore { get; set; }
}
