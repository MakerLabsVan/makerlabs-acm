electrical/
=========================================

# Schematic

![makerlabs-acm-reader-lock-v1.0.1 - Schematic](makerlabs-acm-reader-lock_v1.0.1_schematic.png)

# PCB

## Top Layer
![makerlabs-acm-reader-lock-v1.0.1 - Top PCB Layer](makerlabs-acm-reader-lock_v1.0.1_pcb_top.png)

## Bottom Layer
![makerlabs-acm-reader-lock-v1.0.1 - Bottom PCB Layer](makerlabs-acm-reader-lock_v1.0.1_pcb_bottom.png)

# Bill of Materials (BOM)

## Generating from KiCad / KiBoM
@subpage generate_bom

## BOM CSV

## makerlabs-acm-reader-lock-v1.0.0 - BOM {#bom_csv}

@htmlonly
<style>
#doc-content table {
  border-collapse: collapse;
  border: 2px black solid;
  font: 12px sans-serif;
}

#doc-content td {
  border: 1px black solid;
  padding: 5px;
}
</style>

<script type="text/javascript" src="https://d3js.org/d3.v3.min.js">
</script>

<script type="text/javascript" charset="utf-8">
d3.text("./bom.csv", function(data) {
  var parsedCSV = d3.csv.parseRows(data);

  var container = d3.select("#bom_csv")
    .append("table")

    .selectAll("tr")
      .data(parsedCSV).enter()
      .append("tr")

    .selectAll("td")
      .data(function(d) { return d; }).enter()
      .append("td")
      .text(function(d) { return d; });
});
</script>
@endhtmlonly

# Project Files Overview
[KiCad Project Files Overview](@ref electrical)

@{
@defgroup electrical electrical/
See @ref md_docs_electrical "electrical/ Documentation"
@}
