namespace DispensaInteligente.models.dto
{
    public class CriarSensorDTO
    {
        public string Produto  { get; set; }
        public bool Status { get; set; }

        public CriarSensorDTO( string Produto, bool Status) { 
            this.Produto = Produto;
            this.Status = Status;
        }
    }

     public class SensorDTO
    {
        public int Id { get; set; }
        public string Produto { get; set; }
        public bool Status { get; set; }

        public SensorDTO(int id, string produto, bool status)
        {
            Id = id;
            Produto = produto;
            Status = status;
        }

        // Método estático para mapear o model para o DTO
        public static SensorDTO FromModel(Sensor model)
        {
            return new SensorDTO(model.Id, model.Objeto, model.Status);
        }
    }
}