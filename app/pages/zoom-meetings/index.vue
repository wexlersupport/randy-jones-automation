<script setup lang="ts">
    import { upperFirst } from 'scule'
    import { getPaginationRowModel, type Row } from '@tanstack/table-core'
    import type { TableColumn, TableRow } from '@nuxt/ui/runtime/components/Table.vue.js';

    const UButton = resolveComponent('UButton')
    const UBadge = resolveComponent('UBadge')
    const UDropdownMenu = resolveComponent('UDropdownMenu')
    const UCheckbox = resolveComponent('UCheckbox')

    const data = ref<any[]>([])
    const search = ref('')
    const statusFilter = ref('all')
    const isLoading = ref<boolean>(true)

    const toast = useToast()
    const table = useTemplateRef('table')
    const columnVisibility = ref()
    const rowSelection = ref({})
    const pagination = ref({
        pageIndex: 0,
        pageSize: 10
    })

    onMounted(async () => {
        // const { response } = await fetchingData({
        //     url: '/api/zoom/meeting_summary'
        // })
        // data.value = response?.summaries || []
        data.value = [
            {
                "meeting_host_id": "O44k1ungRciP-ydyJg1TVw",
                "meeting_host_email": "support@wexlerllc.com",
                "meeting_uuid": "Lj3wLvfuRJymgUGpjMlhzg==",
                "meeting_id": 81944047373,
                "meeting_topic": "Wexler Team's Zoom Meeting",
                "meeting_start_time": "2025-09-09T17:37:25Z",
                "meeting_end_time": "2025-09-09T17:41:56Z",
                "summary_start_time": "2025-09-09T17:39:28Z",
                "summary_end_time": "2025-09-09T17:41:46Z",
                "summary_created_time": "2025-09-09T17:37:25Z",
                "summary_last_modified_time": "2025-09-09T19:12:05Z"
            },
            {
                "meeting_host_id": "O44k1ungRciP-ydyJg1TVw",
                "meeting_host_email": "support@wexlerllc.com",
                "meeting_uuid": "hahqH0sHRl2BOXHHt9Z6FA==",
                "meeting_id": 84829666483,
                "meeting_topic": "Wexler Team's Zoom Meeting",
                "meeting_start_time": "2025-09-05T10:15:38Z",
                "meeting_end_time": "2025-09-05T10:16:00Z",
                "summary_created_time": "2025-09-05T10:15:39Z",
                "summary_last_modified_time": "2025-09-05T10:16:03Z"
            },
            {
                "meeting_host_id": "O44k1ungRciP-ydyJg1TVw",
                "meeting_host_email": "support@wexlerllc.com",
                "meeting_uuid": "WLo4ucGtSpCSVcYX74JnwQ==",
                "meeting_id": 89955740494,
                "meeting_topic": "Wexler Team's Zoom Meeting",
                "meeting_start_time": "2025-09-04T20:54:02Z",
                "meeting_end_time": "2025-09-04T20:58:31Z",
                "summary_start_time": "2025-09-04T20:54:54Z",
                "summary_end_time": "2025-09-04T20:58:24Z",
                "summary_created_time": "2025-09-04T20:54:04Z",
                "summary_last_modified_time": "2025-09-04T22:28:41Z"
            }
        ]
        // console.log('Fetched data:', response)

        isLoading.value = false
    })
    
    const filteredRows = computed(() => {
        // console.log('Filtered rows search:', search.value)

        if (!search.value) {
            isLoading.value = true
            setTimeout(() => {
                isLoading.value = false
            }, 1000)

            return data.value
        }
        // page.value = 1
        setTimeout(() => {
            isLoading.value = false
        }, 1000)

        return data.value.filter((d: any) => {
            return Object.values(d).some((value) => {
                return String(value).toLowerCase().includes(search.value.toLowerCase())
            })
        })
    })

    function getRowItems(row: Row<any>) {
        return [
            {
                type: 'label',
                label: 'Actions'
            },
            {
                type: 'separator'
            },
            {
                label: 'Copy Meeting Host Email',
                icon: 'i-lucide-copy',
                onSelect() {
                    console.log('Copying Meeting Host Email:', row)
                    if (!navigator.clipboard) {
                        toast.add({
                            title: 'Clipboard not supported',
                            description: 'Your browser does not support clipboard operations.'
                        })
                        return
                    }
                    if (!row.original || !row.original.name) {
                        toast.add({
                            title: 'Error',
                            description: 'No found for this row.'
                        })
                        return
                    }
                    navigator.clipboard.writeText(row.original.meeting_host_email)

                    toast.add({
                        title: 'Copied to clipboard',
                        description: 'Meeting Host Email copied to clipboard'
                    })
                }
            },
            {
                label: 'View Summary Details',
                icon: 'i-lucide-list',
                onSelect() {
                    console.log('Viewing details:', row)
                    navigateTo('/zoom-meetings/' + row.original.meeting_uuid)
                }
            },
            {
                type: 'separator'
            }
        ]
    }

    const columns: TableColumn<any>[] = [
        {
            id: 'select',
            header: ({ table }) =>
            h(UCheckbox, {
                'modelValue': table.getIsSomePageRowsSelected()
                ? 'indeterminate'
                : table.getIsAllPageRowsSelected(),
                'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
                table.toggleAllPageRowsSelected(!!value),
                'ariaLabel': 'Select all'
            }),
            cell: ({ row }) =>
            h(UCheckbox, {
                'modelValue': row.getIsSelected(),
                'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
                'ariaLabel': 'Select row'
            })
        },
        {
            accessorKey: 'meeting_host_email',
            header: ({ column }) => {
                const isSorted = column.getIsSorted()

                return h(UButton, {
                    color: 'neutral',
                    variant: 'ghost',
                    label: 'Host Email',
                    icon: isSorted
                    ? isSorted === 'asc'
                        ? 'i-lucide-arrow-up-narrow-wide'
                        : 'i-lucide-arrow-down-wide-narrow'
                    : 'i-lucide-arrow-up-down',
                    class: '-mx-2.5',
                    onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
                })
                },
            cell: ({ row }) => {
                return h(UButton, {
                    color: 'neutral',
                    variant: 'subtle',
                    label: row.original.meeting_host_email,
                    onClick: () => navigateTo('/zoom-meetings/' + row.original.meeting_uuid),
                    class: 'text-center cursor-pointer',
                })
            }
        },
        {
            accessorKey: 'meeting_topic',
            header: 'Meeting Topic',
        },
        {
            accessorKey: 'summary_created_time',
            header: 'Meeting Created',
            cell: ({ row }) => {
                return new Date(row.getValue('summary_created_time')).toLocaleString('en-US', {
                    year: "numeric",
                    day: 'numeric',
                    month: 'long',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                })
            }
        },
        {
            id: 'actions',
            cell: ({ row }) => {
                return h(
                    'div',
                    { class: 'text-right' },
                    h(
                    UDropdownMenu,
                    {
                        content: {
                        align: 'end'
                        },
                        items: getRowItems(row)
                    },
                    () =>
                        h(UButton, {
                        icon: 'i-lucide-ellipsis-vertical',
                        color: 'neutral',
                        variant: 'ghost',
                        class: 'ml-auto'
                        })
                    )
                )
            }
        }
    ]

    watch(() => statusFilter.value, (newVal) => {
        console.log('Status filter changed:', newVal, filteredRows.value)
        search.value = 'FilteredByStatus:' + newVal
    })

    function select(row: TableRow<any>, e?: Event) {
        console.log('Row selected:', row)

        row.toggleSelected(!row.getIsSelected())
        console.log(e)
    }

</script>

<template>
    <!-- <UiAppLoading
        v-if="isLoading"
        class="w-full border rounded-md p-6 my-4 border-neutral-800"
    /> -->
    <UDashboardPanel id="material-index">
        <template #header>
            <UDashboardNavbar title="Material List">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>

                <!-- <template #right>
                    <UButton icon="i-lucide-plus" class="cursor-pointer"
                        @click="materialsAddModalRef.onModalOpen()">
                        Add New Material
                    </UButton>
                    <UButton color="neutral" icon="i-lucide-upload" class="cursor-pointer px-4"
                        @click="navigateTo('/material/upload')">
                        Upload TRA-SER
                    </UButton>
                </template> -->
            </UDashboardNavbar>
        </template>

        <template #body>
            <div class="flex flex-wrap items-center justify-between gap-1.5">
                <UInput
                    v-model="search"
                    class="max-w-sm"
                    icon="i-lucide-search"
                    placeholder="Input search term"
                />

                <div class="flex flex-wrap items-center gap-1.5">
                    <UDropdownMenu
                        :items="
                        table?.tableApi
                            ?.getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => ({
                                label: upperFirst(column.id),
                                type: 'checkbox' as const,
                                checked: column.getIsVisible(),
                                onUpdateChecked(checked: boolean) {
                                    table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
                                },
                                onSelect(e?: Event) {
                                    e?.preventDefault()
                                }
                            }))
                        "
                        :content="{ align: 'end' }"
                    >
                        <UButton
                            label="Display"
                            color="neutral"
                            variant="outline"
                            trailing-icon="i-lucide-settings-2"
                        />
                    </UDropdownMenu>
                </div>
            </div>

            <!-- <UiAppLoading
                v-if="isLoading"
                class="border rounded-md p-6 my-4 border-neutral-800"
            /> -->

            <UTable
                ref="table"
                v-model:column-visibility="columnVisibility"
                v-model:row-selection="rowSelection"
                v-model:pagination="pagination"
                :pagination-options="{
                    getPaginationRowModel: getPaginationRowModel()
                }"
                class="shrink-0"
                :data="filteredRows"
                :columns="columns"
                :loading="isLoading"
                @select="select"
                :ui="{
                    base: 'table-fixed border-separate border-spacing-0',
                    thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
                    tbody: '[&>tr]:last:[&>td]:border-b-0',
                    th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
                    td: 'border-b border-default'
                }"
            />

            <div class="flex items-center justify-between gap-3 border-t border-default pt-4 mt-auto"
                v-if="!isLoading">
                <div class="text-sm text-muted">
                    {{ table?.tableApi?.getFilteredSelectedRowModel().rows.length || 0 }} of
                    {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s) selected.
                </div>

                <div class="flex items-center gap-1.5">
                <UPagination
                    :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
                    :items-per-page="table?.tableApi?.getState().pagination.pageSize"
                    :total="table?.tableApi?.getFilteredRowModel().rows.length"
                    @update:page="(p: number) => table?.tableApi?.setPageIndex(p - 1)"
                />
                </div>
            </div>
        </template>
    </UDashboardPanel>
</template>