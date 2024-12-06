namespace DispensaInteligente.models.dto
{
    public class CriarHistoricoDTO
    {
        public string Produto  { get; set; }
        public DateTime DataHora { get; set; }

        public CriarHistoricoDTO( string Produto, DateTime DataHora) { 
            this.Produto = Produto;
            this.DataHora = DataHora;
        }
    }

     public class HistoricoDTO
    {
        public int Id { get; set; }
        public string Produto { get; set; }
        public DateTime DataHora { get; set; }

        public HistoricoDTO(int id, string produto, DateTime dataHora)
        {
            Id = id;
            Produto = produto;
            DataHora = dataHora;
        }

        // Método estático para mapear o model para o DTO
        public static HistoricoDTO FromModel(Historico model)
        {
            return new HistoricoDTO(model.Id, model.Item, model.DataHora);
        }
    }
}
