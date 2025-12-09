#!/bin/bash
set -e

echo "[$(date)] Запуск резервного копирования..."


BACKUP_DIR="/backups"
BACKUP_FILE="$BACKUP_DIR/comments_$(date +%Y%m%d_%H%M).sql"
GITHUB_REPO="https://$GITHUB_TOKEN@github.com/CherteelA/db-backups.git"
CLONE_DIR="/tmp/backup-repo"


pg_dump \
  -h "$DB_HOST" \
  -p "$DB_PORT" \
  -U "$DB_USER" \
  -d "$DB_NAME" \
  --clean \
  --if-exists \
  --no-password \
  > "$BACKUP_FILE"

echo "Дамп сохранён: $BACKUP_FILE"


echo "Отправка в GitHub..."


rm -rf "$CLONE_DIR"
git clone "$GITHUB_REPO" "$CLONE_DIR"

# Копируем файл
cp "$BACKUP_FILE" "$CLONE_DIR/"

# Настраиваем Git
cd "$CLONE_DIR"
git config user.email "asitnikov770@gmail.com"
git config user.name "CherteelA"


git add .
if git diff --staged --quiet; then
    echo "Нет изменений"
else
    git commit -m "Backup $(date -Iseconds)"
    git push
    echo "Бэкап успешно отправлен в GitHub"
fi


