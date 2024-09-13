# Yandex Tracker Client
Клиент для работы с API Яндекс Трекера
## Установка
```shell
npm i yandex-tracker-client
```

## Использование
```typescript
import { Tracker } from 'yandex-tracker-client';

const client = new Tracker('your-token', 'your-org-id');

client.get('v2/issues/TICKET-123').then((data) => {
  console.log('Ticket data:', data);
});

client.post('v2/issues', {
  summary: 'New issue',
  description: 'Description of the issue',
  queue: 'QUEUE',
}).then((data) => {
  console.log('Created ticket:', data);
});

```