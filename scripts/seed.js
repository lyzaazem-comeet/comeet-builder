const fs = require('fs')
const path = require('path')

async function seed() {
  console.log('🌱 Starting seed process...\n')

  // Read the wedding template seed file
  const seedFilePath = path.join(process.cwd(), 'wedding-template-seed.json')
  const seedData = JSON.parse(fs.readFileSync(seedFilePath, 'utf-8'))

  console.log(`📋 Template: ${seedData.templateName}`)
  console.log(`📝 Description: ${seedData.description}\n`)

  // Transform blocks to match app structure
  const blocks = seedData.blocks.map((block, index) => ({
    id: `block-${Date.now()}-${index}`,
    type: block.type,
    position: index,
    config: block.config,
  }))

  // Create the data structure for localStorage
  const appData = {
    blocks,
    theme: seedData.theme,
    lastUpdated: new Date().toISOString(),
  }

  console.log('✅ Generated data structure:')
  console.log(`   - ${blocks.length} blocks`)
  console.log(`   - Theme: ${seedData.theme.primaryColor} / ${seedData.theme.secondaryColor}`)
  console.log('\n📊 Blocks breakdown:')

  const blockTypes = blocks.reduce((acc, block) => {
    acc[block.type] = (acc[block.type] || 0) + 1
    return acc
  }, {})

  Object.entries(blockTypes).forEach(([type, count]) => {
    console.log(`   - ${type}: ${count}`)
  })

  // Output the data as JSON for manual import
  const outputPath = path.join(process.cwd(), 'seed-output.json')
  fs.writeFileSync(outputPath, JSON.stringify(appData, null, 2))

  console.log(`\n💾 Data saved to: seed-output.json`)
  console.log('\n📝 To use this template in your app:')
  console.log('   1. Copy the content of seed-output.json')
  console.log('   2. Open your browser console on your app')
  console.log('   3. Run: localStorage.setItem("event-builder", JSON.stringify(<paste-data-here>))')
  console.log('   4. Refresh the page\n')

  console.log('🎉 Seed completed successfully!\n')
}

// Run the seed
seed().catch((error) => {
  console.error('❌ Error during seed:', error)
  process.exit(1)
})
