<script setup lang="ts">
import GuideCard from '~/components/overview/GuideCard.vue'
import KeyValue from '~/components/overview/KeyValue.vue'
import ScenarioCard from '~/components/overview/ScenarioCard.vue'
import StatusPill from '~/components/overview/StatusPill.vue'
import type { Status } from '~~/shared/types'

type LinkItem = { label: string; to: string; variant: 'primary' | 'secondary' }
type StepItem = { title: string; text: string }
type StatusItem = { label: string; hint: string; status: Status }
type PrincipleItem = { title: string; text: string; bullets: string[] }
type PageCardItem = { title: string; desc: string; to: string; badge: string }
type FieldItem = { k: string; v: string }
type ScenarioItem = { title: string; steps: string[] }

const heroLinks: LinkItem[] = [
  { label: 'Перейти к вопросам', to: '/questions', variant: 'primary' },
  { label: 'Открыть Kanban', to: '/kanban', variant: 'secondary' },
  { label: 'Начать изучение', to: '/study', variant: 'secondary' },
]

const quickSteps: StepItem[] = [
  {
    title: 'Создайте карточку',
    text: 'Добавьте понятный вопрос и развернутый ответ. При необходимости укажите тему и теги.',
  },
  {
    title: 'Проверьте себя в Study',
    text: 'Сначала видите только вопрос, затем открываете ответ и ставите оценку — так формируется прогресс. [1]',
  },
  {
    title: 'Двигайте по статусам',
    text: 'Меняйте статус в таблице или Kanban — везде будет одно и то же состояние. [1]',
  },
]

const statuses: StatusItem[] = [
  { label: 'В процессе', hint: 'Учите прямо сейчас', status: 'inProgress' },
  { label: 'To do', hint: 'Ещё не начинали', status: 'todo' },
  { label: 'На повторение', hint: 'Нужно повторить позже', status: 'review' },
  { label: 'Выучено', hint: 'Материал закреплён', status: 'learned' },
]

const principles: PrincipleItem[] = [
  {
    title: 'Единые статусы обучения',
    text: 'В Knowly статус — это главное “состояние” вопроса. Он одинаковый на всех страницах. [1]',
    bullets: [
      'Изменили статус в таблице → он поменялся в Kanban и Study.',
      'После обновления страницы статус не “откатывается” — данные должны быть консистентны. [1]',
    ],
  },
  {
    title: 'Kanban: перенос и порядок',
    text: 'Kanban нужен для быстрого управления прогрессом: переместили карточку — поменяли этап обучения. [1]',
    bullets: [
      'Перенос в другую колонку меняет статус.',
      'Перетаскивание внутри колонки меняет порядок.',
      'После refresh карточка остаётся в той же колонке и на том же месте. [1]',
    ],
  },
  {
    title: 'Понятные состояния интерфейса',
    text: 'Страницы должны быть “живыми”: показывать загрузку, пустые состояния и ошибки. [1]',
    bullets: [
      'Loading (skeleton/spinner) при запросах к API.',
      'Empty state, если данных нет или фильтр ничего не нашёл.',
      'Подтверждение удаления + уведомления (toast) после действий. [1]',
    ],
  },
]

const pages: PageCardItem[] = [
  {
    title: 'Questions (таблица)',
    desc: 'Главное место управления базой вопросов: искать, фильтровать, сортировать, менять статус, открывать карточку.',
    to: '/questions',
    badge: 'Table',
  },
  {
    title: 'Kanban',
    desc: 'Визуально перемещайте карточки между этапами обучения и упорядочивайте их внутри колонок. [1]',
    to: '/kanban',
    badge: 'D&D',
  },
  {
    title: 'Study',
    desc: 'Режим самопроверки: вопрос → подумали → открыли ответ → поставили оценку → получили следующий.',
    to: '/study',
    badge: 'Review',
  },
  {
    title: 'Dashboard',
    desc: 'Сводка прогресса: счётчики, очередь повторений, прогресс и последние добавленные вопросы. [1]',
    to: '/dashboard',
    badge: 'Stats',
  },
]

const questionFields: FieldItem[] = [
  { k: 'title', v: 'краткий и однозначный вопрос' },
  { k: 'answer', v: 'развернутый ответ (WYSIWYG-форматирование)' },
  { k: 'topic_id', v: 'к какой теме относится вопрос' },
  { k: 'tags', v: 'доп. метки для быстрого поиска' },
  { k: 'status', v: 'этап обучения (один из 4)' },
  { k: 'next_review_at', v: 'когда повторить (логика повторений на backend)' },
]

const scenarios: ScenarioItem[] = [
  {
    title: 'Сменить статус в таблице',
    steps: [
      'Откройте Questions.',
      'Найдите нужную карточку через поиск/фильтр.',
      'Поменяйте статус — он сразу отразится в Kanban и Study. [1]',
    ],
  },
  {
    title: 'Переместить карточку в Kanban',
    steps: [
      'Откройте Kanban.',
      'Перетащите карточку в нужную колонку или поменяйте порядок внутри неё.',
      'Обновите страницу и убедитесь, что всё сохранилось. [1]',
    ],
  },
  {
    title: 'Пройти карточку в Study',
    steps: [
      'Откройте Study.',
      'Прочитайте вопрос и попробуйте ответить “в голове”.',
      'Откройте ответ и поставьте оценку — система сохранит review и рассчитает следующее повторение. [1]',
    ],
  },
]

const ctaLinks: LinkItem[] = [
  { label: 'Создать вопрос', to: '/questions/new', variant: 'primary' },
  { label: 'Перейти в Study', to: '/study', variant: 'secondary' },
]

const linkClass = (variant: LinkItem['variant']) =>
  variant === 'primary'
    ? 'inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500'
    : 'inline-flex items-center justify-center rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-slate-900 ring-1 ring-inset ring-slate-300 hover:bg-slate-50'
</script>

<template>
  <div class="min-h-screen bg-slate-50">
    <section class="border-b border-slate-200 bg-white">
      <div class="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div class="grid gap-10 lg:grid-cols-12 lg:items-center">
          <div class="lg:col-span-7">
            <p class="text-sm font-semibold tracking-wide text-indigo-600">Knowly · Обзор</p>

            <h1 class="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Knowly — ваш личный “учебный борд” из вопросов и ответов
            </h1>

            <p class="mt-4 text-base leading-7 text-slate-600">
              Здесь вы собираете собственную базу карточек «вопрос → развернутый ответ», а затем
              регулярно проверяете себя в режиме Study и продвигаете карточки по этапам знания. [1]
            </p>

            <div class="mt-7 flex flex-wrap gap-3">
              <NuxtLink
                v-for="link in heroLinks"
                :key="link.to"
                :to="link.to"
                :class="linkClass(link.variant)"
              >
                {{ link.label }}
              </NuxtLink>
            </div>
          </div>

          <div class="lg:col-span-5">
            <div class="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <h2 class="text-base font-semibold text-slate-900">
                Как пользоваться (за 30 секунд)
              </h2>

              <ol class="mt-4 space-y-3 text-sm text-slate-700">
                <li v-for="(step, idx) in quickSteps" :key="idx" class="flex gap-3">
                  <span
                    class="shrink-0 mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white"
                  >
                    {{ idx + 1 }}
                  </span>
                  <div>
                    <div class="font-semibold text-slate-900">{{ step.title }}</div>
                    <div class="mt-0.5 text-slate-700">{{ step.text }}</div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid gap-6 lg:grid-cols-3">
        <div
          v-for="p in principles"
          :key="p.title"
          class="rounded-2xl border border-slate-200 bg-white p-6"
        >
          <h3 class="text-base font-semibold text-slate-900">{{ p.title }}</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600">{{ p.text }}</p>

          <ul class="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
            <li v-for="(b, i) in p.bullets" :key="i">{{ b }}</li>
          </ul>

          <div v-if="p.title === 'Единые статусы обучения'" class="mt-4 grid grid-cols-2 gap-2">
            <StatusPill
              v-for="s in statuses"
              :key="s.label"
              :label="s.label"
              :hint="s.hint"
              :status="s.status"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="border-y border-slate-200 bg-white">
      <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-semibold tracking-tight text-slate-900">Разделы приложения</h2>
        <p class="mt-2 text-sm leading-6 text-slate-600">
          Выберите, куда перейти — каждый раздел решает конкретную задачу.
        </p>

        <div class="mt-8 grid gap-6 md:grid-cols-2">
          <GuideCard
            v-for="card in pages"
            :key="card.to"
            :title="card.title"
            :desc="card.desc"
            :to="card.to"
            :badge="card.badge"
          />
        </div>

        <div class="mt-10 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <h3 class="text-base font-semibold text-slate-900">Что такое “вопрос” внутри Knowly</h3>
          <p class="mt-2 text-sm leading-6 text-slate-600">
            Карточка — это не просто текст. У неё есть поля для организации (темы/теги) и поля для
            обучения (статус и повторения). [1]
          </p>

          <div class="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <KeyValue v-for="f in questionFields" :key="f.k" :k="f.k" :v="f.v" />
          </div>
        </div>
      </div>
    </section>

    <section class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 class="text-2xl font-semibold tracking-tight text-slate-900">Быстрые сценарии</h2>
      <p class="mt-2 text-sm leading-6 text-slate-600">
        Самые частые действия — коротко и по шагам.
      </p>

      <div class="mt-8 grid gap-6 lg:grid-cols-3">
        <ScenarioCard v-for="sc in scenarios" :key="sc.title" :title="sc.title">
          <ol class="list-decimal space-y-2 pl-5 text-sm text-slate-700">
            <li v-for="(st, i) in sc.steps" :key="i">{{ st }}</li>
          </ol>
        </ScenarioCard>
      </div>
    </section>

    <section class="border-t border-slate-200 bg-white">
      <div class="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div
          class="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-6"
        >
          <div>
            <h3 class="text-base font-semibold text-slate-900">Готовы начать?</h3>
            <p class="mt-1 text-sm text-slate-600">
              Создайте первую карточку и попробуйте пройти её в Study — так быстрее всего понять
              механику. [1]
            </p>
          </div>

          <div class="flex gap-3">
            <NuxtLink
              v-for="link in ctaLinks"
              :key="link.to"
              :to="link.to"
              :class="linkClass(link.variant)"
            >
              {{ link.label }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
