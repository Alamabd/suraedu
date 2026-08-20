"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { getAuth } from "firebase/auth"
import { toast } from "sonner"

import { useAuth } from "@/store/useAuth"
import { useConfirm } from "@/store/useConfirm"
import DashboardHeader from "@/components/dashboard/dashboardHeader"
import DashboardContent from "@/components/dashboard/dashboardContent"
import LetterModal from "@/components/dashboard/modalLetter"
import ModalPreview from "@/components/dashboard/modalPreview"
import { Letter, useLetters } from "@/store/useLetters"

interface ModalState {
  open: boolean
  letter_id: number | null
}

export default function Dashboard() {
  const { user, logout } = useAuth()
  const auth = getAuth()
  const { letters, fetchLetters, removeLetter } = useLetters()
  const [letterModal, setLetterModal] = useState<ModalState>({
    open: false,
    letter_id: null,
  })
  const [previewModal, setPreviewModal] = useState<ModalState>({
    open: false,
    letter_id: null
  })

  const confirm = useConfirm()
  const router = useRouter()

  const goLogout = async () => {
    const ask = await confirm({
      title: "peringatan",
      description: "yakin ingin logout",
    })
    if (ask) {
      logout()
      router.replace("/")
    }
  }

  const handleRemoveLetter = async (id: number) => {
    try {
      const ok = await confirm({
        title: "Peringatan",
        description: "Yakin ingin hapus surat",
      })
      if (ok) {
        await removeLetter(id)
        toast.success("Berhasil", {
          description: "Template surat berhasil dihapus.",
          richColors: true,
        })
        handleGetLetters()
      }
    } catch (error) {
      toast.error("Gagal", {
        description:
          error instanceof Error ? error.message : "Terjadi kesalahan",
        richColors: true,
      })
    }
  }

  const handleGetLetters = async () => {
    fetchLetters()
  }

  useEffect(() => {
    if (user) {
      handleGetLetters()
    }
  }, [user])

  useEffect(() => {
    console.log(letterModal)
  }, [letterModal])

  return (
    <div className="min-h-screen bg-muted/30 pb-12">
      <div className="mx-auto max-w-7xl space-y-8 p-4 md:p-8">
        <DashboardHeader
          user={user}
          lettersCount={letters.length}
          onNewTemplate={() => setLetterModal({ letter_id: 0, open: true })}
          onLogout={goLogout}
        />

        {/* Dashboard Main Content */}
        <DashboardContent
          onNewTemplate={() => setLetterModal({ letter_id: null, open: true })}
          onEditLetter={(letter_id) => setLetterModal({ letter_id: letter_id, open: true })}
          onRemoveLetter={handleRemoveLetter}
          onPreviewLetter={(letter_id) => setPreviewModal({ letter_id, open: true })}
        />
      </div>

      {
        <LetterModal
          open={letterModal.open}
          onOpenChange={() => setLetterModal({ ...letterModal, open: false })}
          letter_id={letterModal.letter_id}
        />
      }
      {
        previewModal.letter_id &&
        <ModalPreview
          letter_id={previewModal.letter_id}
          open={previewModal.open}
          onOpenChange={() => setPreviewModal({ ...previewModal, open: false })}
        />
      }
      <footer className="text-center text-xs">
        @copyright all reserved by Al Abd with 🔥
      </footer>
    </div>
  )
}
