import React from "react";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export const MainHeader = () => {
    console.log("MainHeader renderizado"); // Debug

    return (
        <div className="status-header">
            <div className="status-container">
                {/* Menu Hambúrguer com Sheet */}
                <Sheet>
                    <SheetTrigger asChild>
                        <button className="menu-icon">
                            <Menu size={24} color="#ffffff" />
                        </button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[220px] bg-[#1a1a1a] text-white">
                        <div className="p-6">
                            <h2 className="text-xl font-bold mb-4 text-white">Configurações</h2>
                            <p className="text-white">Teste do Sheet</p>
                        </div>
                    </SheetContent>
                </Sheet>
                
                {/* Código */}
                <div className="status-icon" style={{color: '#e44d26'}}>
                    <span>5</span>
                    <div>💻</div>
                </div>
                
                {/* Chama */}
                <div className="status-icon" style={{color: '#cccccc'}}>
                    <span>0</span>
                    <div>🔥</div>
                </div>
                
                {/* Diamante */}
                <div className="status-icon" style={{color: '#ffc107'}}>
                    <span>17</span>
                    <div>💎</div>
                </div>
                
                {/* Raio */}
                <div className="status-icon" style={{color: '#9c27b0'}}>
                    <span>5</span>
                    <div>⚡</div>
                </div>
            </div>
        </div>
    )
} 