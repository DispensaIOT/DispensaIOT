
public class Lista
{
    public int Id { get; set; }
    public required string Produto {get; set; }
    public int Quantidade {get; set; }
    public DateTime DataHora { get; internal set; }
}