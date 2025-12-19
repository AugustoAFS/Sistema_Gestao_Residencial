namespace Sistema_Gestao_Residencial.Models.DTOs.Response
{
    public class ResponseDto<T>
    {
        public bool Success { get; set; }
        public int StatusCode { get; set; }
        public string? Message { get; set; }
        public T? Data { get; set; }
        public List<string>? Errors { get; set; }

        public ResponseDto()
        {
            Errors = new List<string>();
        }

        public ResponseDto(T data, string? message = null)
        {
            Success = true;
            StatusCode = 200;
            Message = message;
            Data = data;
            Errors = new List<string>();
        }

        public ResponseDto(int statusCode, string message, List<string>? errors = null)
        {
            Success = false;
            StatusCode = statusCode;
            Message = message;
            Errors = errors ?? new List<string>();
        }
    }
    public class ResponseDto : ResponseDto<object>
    {
        public ResponseDto() : base() { }
        
        public ResponseDto(string message, int statusCode = 200) 
            : base(statusCode >= 200 && statusCode < 300 ? null : statusCode, message)
        {
            Success = statusCode >= 200 && statusCode < 300;
            StatusCode = statusCode;
        }
    }
}
