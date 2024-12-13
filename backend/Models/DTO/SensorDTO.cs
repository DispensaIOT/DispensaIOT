namespace Dispensa.models.dto
{
    public class CriarSensorDTO
    {
        public string Produto { get; set; }
        public bool Status { get; set; }

        public CriarSensorDTO(string Produto, bool Status)
        {
            this.Produto = Produto;
            this.Status = Status;
        }
    }
}