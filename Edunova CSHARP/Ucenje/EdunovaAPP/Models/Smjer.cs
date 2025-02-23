﻿using System.ComponentModel.DataAnnotations.Schema;

namespace EdunovaAPP.Models
{
    public class Smjer: Entitet
    {

        public string? Naziv { get; set; }
        public int? Trajanje { get; set; }
        public decimal? Cijena { get; set; }
        public DateTime? IzvodiSeOd { get; set; }
        [Column("verificiran")] // ovo se ne mora u završnom raditi
        public bool? Vaucer { get; set; }

    }
}
