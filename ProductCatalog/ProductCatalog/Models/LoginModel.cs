using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductCatalog.Models
{
    public class LoginModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class RegisterModel  //заменено на креэйт в юзерсервис 16 строка
    {
        public string Email { get; set; }
        public string Password { get; set; }

    }

    public class CreateUserModel
    {
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; } // Роль пользователя: "Простой пользователь", "Продвинутый пользователь", "Администратор"
    }

    public class ChangePasswordModel
    {
        public string CurrentPassword { get; set; }
        public string NewPassword { get; set; }
    }
}
