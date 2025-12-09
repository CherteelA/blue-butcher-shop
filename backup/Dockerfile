FROM postgres:16

RUN apt-get update && apt-get install -y git cron && rm -rf /var/lib/apt/lists/*

COPY backup.sh /app/backup.sh
RUN chmod +x /app/backup.sh


RUN echo "0 1 * * * /app/backup.sh >> /var/log/backup.log 2>&1" | crontab -

# Запускаем cron в foreground
CMD ["cron", "-f"]