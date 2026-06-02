"use client"

import type { Block, BlockType, Theme } from "@/types/blocks"
import { DropZone } from "./drop-zone"
import { SortableBlock } from "./sortable-block"
import { ScrollArea } from "@/components/ui/scroll-area"

import { HeaderBlock } from "./header-block"
import { HeroBlock } from "./hero-block"
import { AgendaBlock } from "./agenda-block"
import { SpeakersBlock } from "./speakers-block"
import { LocationBlock } from "./location-block"
import { GalleryBlock } from "./gallery-block"
import { FAQBlock } from "./faq-block"
import { ContactBlock } from "./contact-block"
import { FooterBlock } from "./footer-block"
import { TextImageBlock } from "./text-image-block"
import { TicketingBlock } from "./ticketing-block"
import { CustomFormBlock } from "./custom-form-block"

interface PreviewProps {
  blocks: Block[]
  selectedBlock: Block | null
  onSelectBlock: (block: Block) => void
  onDeleteBlock: (id: string) => void
  onReorderBlocks: (dragIndex: number, hoverIndex: number) => void
  onAddBlock: (type: BlockType, position: number) => void
  theme: Theme
}

export function Preview({
  blocks,
  selectedBlock,
  onSelectBlock,
  onDeleteBlock,
  onReorderBlocks,
  onAddBlock,
  theme,
}: PreviewProps) {
  const handleDropBlock = (blockType: BlockType, position: number) => {
    onAddBlock(blockType, position)
  }

  const renderBlock = (block: Block) => {
    const isSelected = selectedBlock?.id === block.id
    const commonProps = {
      config: block.config,
      theme,
      isSelected,
      onClick: () => onSelectBlock(block),
    }

    switch (block.type) {
      case "header":
        return (
          <section id={block.id}>
            <HeaderBlock {...commonProps} />
          </section>
        )
      case "hero":
        return (
          <section id={block.id}>
            <HeroBlock {...commonProps} />
          </section>
        )
      case "agenda":
        return (
          <section id={block.id}>
            <AgendaBlock {...commonProps} />
          </section>
        )
      case "speakers":
        return (
          <section id={block.id}>
            <SpeakersBlock {...commonProps} />
          </section>
        )
      case "location":
        return (
          <section id={block.id}>
            <LocationBlock {...commonProps} />
          </section>
        )
      case "rsvp":
        return (
          <section id={block.id}>
            <CustomFormBlock {...commonProps} />
          </section>
        )
      case "gallery":
        return (
          <section id={block.id}>
            <GalleryBlock {...commonProps} />
          </section>
        )
      case "faq":
        return (
          <section id={block.id}>
            <FAQBlock {...commonProps} />
          </section>
        )
      case "contact":
        return (
          <section id={block.id}>
            <ContactBlock {...commonProps} />
          </section>
        )
      case "footer":
        return (
          <section id={block.id}>
            <FooterBlock {...commonProps} />
          </section>
        )
      case "text-image":
        return (
          <section id={block.id}>
            <TextImageBlock {...commonProps} />
          </section>
        )
      case "ticketing":
        return (
          <section id={block.id}>
            <TicketingBlock {...commonProps} />
          </section>
        )
      case "custom-form":
        return (
          <section id={block.id}>
            <CustomFormBlock {...commonProps} />
          </section>
        )
      default:
        return <div>Unknown block type: {block.type}</div>
    }
  }

  if (blocks.length === 0) {
    return (
      <div className="flex-1 bg-background">
        <ScrollArea className="h-[calc(100vh-56px)]">
          <div className="min-h-full flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-dashed border-muted-foreground rounded-lg flex items-center justify-center">
                  <span className="text-2xl">+</span>
                </div>
              </div>

              <h3 className="text-xl font-semibold mb-2">
                Commencez à construire votre site
              </h3>
              <p className="text-muted-foreground mb-6">
                Glissez-déposez des blocs depuis la bibliothèque pour créer
                votre site d'événement.
              </p>

              <DropZone
                onDrop={handleDropBlock}
                position={0}
                isVisible={true}
              />
            </div>
          </div>
        </ScrollArea>
      </div>
    )
  }

  return (
    <div className="flex-1 bg-background">
      <ScrollArea className="h-[calc(100vh-56px)]">
        <div className="min-h-full pb-8">
          {/* Drop zone at the top */}
          <div className="p-4">
            <DropZone onDrop={handleDropBlock} position={0} />
          </div>

          {/* Render blocks */}
          {blocks.map((block, index) => (
            <div key={block.id}>
              <SortableBlock
                block={block}
                index={index}
                onReorder={onReorderBlocks}
                onDelete={onDeleteBlock}
                isSelected={selectedBlock?.id === block.id}
                onSelect={() => onSelectBlock(block)}
              >
                {renderBlock(block)}
              </SortableBlock>

              {/* Drop zone after each block */}
              <div className="px-4">
                <DropZone onDrop={handleDropBlock} position={index + 1} />
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}
