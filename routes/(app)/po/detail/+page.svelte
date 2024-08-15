<script>
	export let data
</script>

<table>
	<tr>
		<th> Part_no </th>
		<th> Part_desc </th>
		<th> Po_qty </th>
		<th> Unit_price </th>
		<th> Received_qty </th>
		<th> Desp_qty </th>
	</tr>

	{#if data.result}
		{#each data.result as i}
			<tr>
				<td>
					{i.part_no}
				</td>
				<td>{i.part_desc}</td>
				<td>{i.po_qty}</td>
				<td>{i.unit_price}</td>
				<td>{i.received_qty}</td>
				<td>{i.desp_qty}</td>
			</tr>
		{/each}
	{/if}
</table>
