namespace Dispensa.models.dto
{
    public class CriarListaDTO
    {
        public string Produto { get; set; }
        public int Quantidade { get; set; }
       

        public CriarListaDTO(string Produto, int Quantidade)
        {
            this.Produto = Produto;
            this.Quantidade = Quantidade;
           
        }
    }
}