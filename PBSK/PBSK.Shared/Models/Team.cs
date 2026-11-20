namespace PBSK.Shared.Models;

public class Team
{
    public string Name { get; set; } = string.Empty;
    public int Score { get; set; }
    public string Player1 { get; set; } = string.Empty;
    public string Player2 { get; set; } = string.Empty;
    public int LastSideOutScore { get; set; } = 0;
    public int CurrentSideOutScore { get; set; } = 0;
    public bool HasReachedOne { get; set; }
}
