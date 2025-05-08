.PHONY: build up all

# Comandos padrão
build:
	@echo "🚀 Iniciando build dos containers..."
	docker-compose build

up:
	@echo "📦 Subindo os containers..."
	docker-compose up -d

# Comando que executa build e up em sequência
all: build up
	@echo "✅ Processo concluído com sucesso!"
	@echo "📦 Os containers estão rodando em background." 