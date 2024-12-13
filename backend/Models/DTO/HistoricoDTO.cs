namespace Dispensa.models.dto
{
    public class CriarHistoricoDTO
    {
        public string Produto { get; set; }
      
      

        public CriarHistoricoDTO(string Produto, DateTime DataHora)
        {
            this.Produto = Produto;
           
        }
    }
}