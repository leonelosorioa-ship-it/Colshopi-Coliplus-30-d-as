import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Clock, Users, Sparkles, Check, X, UtensilsCrossed, ChevronRight, Bookmark } from 'lucide-react';
import { Recipe } from '../types';
import { GUT_RECIPES } from '../data/recipesData';

interface RecipeBookProps {
  initialRecipeId?: string | null;
  onCloseInitial?: () => void;
}

const CATEGORIES = [
  'Todas las Recetas',
  'Batidos & Smoothies',
  'Desayunos Colon-Friendly',
  'Almuerzos & Cenas',
  'Infusiones & Caldos'
];

export const RecipeBook: React.FC<RecipeBookProps> = ({ initialRecipeId, onCloseInitial }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todas las Recetas');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(
    initialRecipeId ? (GUT_RECIPES.find(r => r.id === initialRecipeId) || null) : null
  );
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});

  const filteredRecipes = GUT_RECIPES.filter((r) => {
    const matchCat = activeCategory === 'Todas las Recetas' || r.category === activeCategory;
    const matchQuery =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.description.toLowerCase().includes(search.toLowerCase()) ||
      r.ingredients.some(i => i.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchQuery;
  });

  const toggleIngredient = (ing: string) => {
    setCheckedIngredients(prev => ({
      ...prev,
      [ing]: !prev[ing]
    }));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-sm space-y-4">
        <div>
          <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider">
            Nutrición Celular & Colon Saludable
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A] font-display">
            Recetario Antiinflamatorio Digestivo
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1 max-w-2xl">
            12 preparaciones terapéuticas bajas en FODMAPs, libres de irritantes y enriquecidas con los superalimentos funcionales de Coli Plus.
          </p>
        </div>

        {/* Search & Category Pills */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
          {/* Search Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por ingrediente (chía, calabaza, jengibre)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#CBD5E1] bg-[#FAF6F0] text-xs focus:ring-2 focus:ring-[#0F766E] focus:outline-hidden"
            />
          </div>

          {/* Categories */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeCategory === cat
                    ? 'bg-[#0F766E] text-white shadow-xs'
                    : 'bg-[#F1F5F9] text-[#475569] hover:bg-[#E2E8F0]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Recipes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe.id}
            onClick={() => {
              setSelectedRecipe(recipe);
              setCheckedIngredients({});
            }}
            className="bg-white rounded-3xl p-5 border border-[#E2E8F0] shadow-xs hover:shadow-md hover:border-[#0F766E] cursor-pointer transition-all flex flex-col justify-between group"
          >
            <div className="space-y-3">
              {/* Badges */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                  {recipe.category}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E]">
                  {recipe.fodmapStatus}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-bold text-[#0F172A] group-hover:text-[#0F766E] transition-colors leading-snug">
                {recipe.title}
              </h3>
              <p className="text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                {recipe.description}
              </p>

              {/* ColiPlus Tag */}
              {recipe.colplusUsage && (
                <div className="p-2 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex items-center space-x-1.5 text-[11px] text-[#065F46] font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#059669] shrink-0" />
                  <span className="truncate">{recipe.colplusUsage}</span>
                </div>
              )}
            </div>

            {/* Footer details */}
            <div className="mt-4 pt-3 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] text-[#64748B]">
              <div className="flex items-center space-x-3">
                <span className="flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-[#94A3B8]" />
                  {recipe.prepTime}
                </span>
                <span className="flex items-center">
                  <Users className="w-3.5 h-3.5 mr-1 text-[#94A3B8]" />
                  {recipe.servings}
                </span>
              </div>
              <span className="text-[#0F766E] font-bold group-hover:translate-x-1 transition-transform flex items-center">
                Ver Receta <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Recipe Detail */}
      <AnimatePresence>
        {selectedRecipe && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#E2E8F0] overflow-hidden my-6"
            >
              {/* Header */}
              <div className="bg-[#FAF6F0] p-5 sm:p-6 border-b border-[#E2E8F0] flex items-start justify-between">
                <div className="space-y-1 pr-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#ECFDF5] text-[#065F46] border border-[#A7F3D0]">
                      {selectedRecipe.category}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#FEF3C7] text-[#92400E]">
                      {selectedRecipe.fodmapStatus}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-display">
                    {selectedRecipe.title}
                  </h2>
                  <div className="flex items-center space-x-4 text-xs text-[#64748B] pt-1">
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {selectedRecipe.prepTime}
                    </span>
                    <span className="flex items-center">
                      <Users className="w-3.5 h-3.5 mr-1" />
                      {selectedRecipe.servings}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setSelectedRecipe(null);
                    onCloseInitial?.();
                  }}
                  className="p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F1F5F9] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-5 sm:p-6 space-y-6 max-h-[72vh] overflow-y-auto">
                
                {/* Coli Plus Banner if used */}
                {selectedRecipe.colplusUsage && (
                  <div className="p-3.5 rounded-2xl bg-[#ECFDF5] border border-[#A7F3D0] flex items-center space-x-2.5">
                    <Sparkles className="w-5 h-5 text-[#0F766E] shrink-0" />
                    <div>
                      <span className="text-xs font-bold text-[#065F46]">Dosis sugerida de Coli Plus:</span>
                      <p className="text-xs text-[#047857]">{selectedRecipe.colplusUsage}</p>
                    </div>
                  </div>
                )}

                {/* Gut Benefit Card */}
                <div className="p-4 rounded-2xl bg-[#FAF6F0] border-l-4 border-[#0F766E] space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F766E]">
                    Beneficio Terapéutico para el Colon:
                  </span>
                  <p className="text-xs text-[#334155] leading-relaxed">
                    {selectedRecipe.gutBenefit}
                  </p>
                </div>

                {/* Ingredients with Checklist */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-bold text-[#334155] uppercase tracking-wider">
                      Ingredientes (Lista de Compras Interactiva)
                    </h3>
                    <span className="text-[10px] text-[#64748B]">Toca para marcar</span>
                  </div>

                  <div className="space-y-1.5">
                    {selectedRecipe.ingredients.map((ing) => {
                      const isDone = !!checkedIngredients[ing];
                      return (
                        <div
                          key={ing}
                          onClick={() => toggleIngredient(ing)}
                          className={`p-2.5 rounded-xl border text-xs cursor-pointer transition-all flex items-center space-x-2.5 ${
                            isDone
                              ? 'bg-[#F0FDF4] border-[#86EFAC] line-through text-[#64748B]'
                              : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#334155] hover:bg-white'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${isDone ? 'bg-[#10B981] border-[#10B981] text-white' : 'border-[#CBD5E1] bg-white'}`}>
                            {isDone && <Check className="w-3 h-3" />}
                          </div>
                          <span>{ing}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Step-by-Step Instructions */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-[#334155] uppercase tracking-wider">
                    Preparación Paso a Paso
                  </h3>

                  <div className="space-y-2.5">
                    {selectedRecipe.instructions.map((step, idx) => (
                      <div key={idx} className="flex items-start space-x-3 text-xs text-[#334155]">
                        <span className="w-5 h-5 rounded-full bg-[#0F766E] text-white flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                          {idx + 1}
                        </span>
                        <p className="leading-relaxed flex-1">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Footer */}
              <div className="p-4 bg-[#FAF6F0] border-t border-[#E2E8F0] flex justify-end">
                <button
                  onClick={() => {
                    setSelectedRecipe(null);
                    onCloseInitial?.();
                  }}
                  className="px-6 py-2 rounded-xl bg-[#0F766E] text-white font-bold text-xs hover:bg-[#115E59] transition-colors"
                >
                  Entendido ✓
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
