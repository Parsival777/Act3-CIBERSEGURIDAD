# 1. Recurso: Bucket S3
resource "aws_s3_bucket" "actividad_bucket" {
  bucket = "actividad3-seguro-local"
}

# 2. Recurso: Cifrado SSE-S3 (AES256)
resource "aws_s3_bucket_server_side_encryption_configuration" "cifrado" {
  bucket = aws_s3_bucket.actividad_bucket.id

  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# 3. Recurso: 4 Controles de Bloqueo de Acceso Público
resource "aws_s3_bucket_public_access_block" "bloqueo_publico" {
  bucket = aws_s3_bucket.actividad_bucket.id

  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}